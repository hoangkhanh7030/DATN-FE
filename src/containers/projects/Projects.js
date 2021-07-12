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
import { LOGIN_URL } from "constants/index";

const STATUS = "status";
const SIZE = "size";

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

  const [status, setStatus] = useState("STATUS");

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getProjects(id, rowsPerPage, page - 1)).catch(() =>
      setOpenMessage(true)
    );
  }, [dispatch, id, rowsPerPage, page]);

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
    switch (event.target.name) {
      case STATUS: {
        setStatus(event.target.value);
        break;
      }
      case SIZE: {
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
        status={status}
        handleChangeDropdown={handleChangeDropdown}
      />

      <Box className={classes.boxTable}>
        <ProjectsTable
          rows={projects}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
        />
      </Box>
      <TableFooter
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={storeProjects.numPage}
        page={page}
      />

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
