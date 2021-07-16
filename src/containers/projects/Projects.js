import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import { ThemeProvider, Box } from "@material-ui/core";

import ProjectsTable from "./Table";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

import { Message } from "components/common/Message";
import { Progress } from "components/common/Progress";

import { getProjects } from "redux/actions/projectAction";
import { clearMessage } from "redux/actions/msgAction";

import { theme } from "assets/css/Common";
import { useStyles } from "./style";
import { LOGIN_URL, STATUS, ACTIVE } from "constants/index";

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [projects, setProjects] = useState([]);

  const [searched, setSearched] = useState("");

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [hasMessage, setOpenMessage] = useState(false);

  const storeProjects = useSelector((state) => state.projects);

  const [status, setStatus] = useState(STATUS);

  const [order, setOrder] = useState(false);

  const [orderBy, setOrderBy] = useState("");

  const onSearchChange = (newValue) => {
    setSearched(newValue);
    setPage(1);
  };

  const cancelSearch = () => {
    setSearched("");
  };

  const handleSort = (orderBy) => {
    setOrderBy(orderBy);
    setOrder(!order);
  };

  useEffect(() => {
    dispatch(clearMessage());

    const timer = setTimeout(() => {
      dispatch(
        getProjects(
          id,
          page - 1,
          rowsPerPage,
          searched,
          order ? "ASC" : "DESC",
          orderBy,
          status === STATUS ? "" : status === ACTIVE ? true : false
        )
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, id, searched, status, rowsPerPage, page, order, orderBy]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }

    setProjects(storeProjects.data);
  }, [storeProjects.data]);

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDropdown = (event) => {
    setPage(1);
    switch (event.target.name) {
      case "status": {
        setStatus(event.target.value);
        break;
      }
      case "size": {
        setRowsPerPage(event.target.value);
        break;
      }
      default:
        return;
    }
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length);

  if (!isLoggedIn) return <Redirect to={LOGIN_URL} />;

  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={searched}
        onSearchChange={onSearchChange}
        cancelSearch={cancelSearch}
        status={status}
        handleChangeDropdown={handleChangeDropdown}
      />

      <Box className={classes.boxTable}>
        <ProjectsTable
          rows={projects}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleSort={handleSort}
        />
      </Box>
      {projects.length > 0 && (
        <TableFooter
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeDropdown={handleChangeDropdown}
          numPage={storeProjects.numPage}
          page={page}
        />
      )}

      {message && (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={"error"}
        />
      )}

      <Progress isOpen={storeProjects.isLoading} />
    </ThemeProvider>
  );
}
