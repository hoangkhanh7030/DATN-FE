import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ThemeProvider, Box } from "@material-ui/core";

import ProjectsTable from "./Table";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

import { Message } from "components/common/Message";

import { getProjects, addProject } from "redux/actions/projectAction";
import { clearMessage } from "redux/actions/msgAction";

import { theme } from "assets/css/Common";
import { useStyles } from "./style";
import {
  STATUS_OPTION,
  SIZE_OPTION,
  ASC,
  DESC,
  STATUS,
  INITIAL_PAGE,
  INITIAL_ROWS_PER_PAGE,
  DEFAULT_PROJECT,
  PROJECT_NAME,
  CLIENT_NAME,
  COLOR,
  TEXT_COLOR,
  COLOR_PATTERN,
} from "constants/index";

import * as _ from "underscore";

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { message } = useSelector((state) => state.message);

  const [projects, setProjects] = useState([]);

  const [searched, setSearched] = useState("");

  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);

  const [hasMessage, setOpenMessage] = useState(false);

  const storeProjects = useSelector((state) => state.projects);

  const [status, setStatus] = useState(STATUS);

  const [order, setOrder] = useState(false);

  const [orderBy, setOrderBy] = useState("");

  const [project, setProject] = useState(DEFAULT_PROJECT);

  const [isOpenDialog, setOpenDialog] = useState(false);

  const setProjectParams = (
    searchNameParam = searched,
    pageParam = page,
    sizeParam = rowsPerPage,
    sortNameParam = orderBy,
    typeParam = order,
    isActivateParam = status
  ) => {
    return {
      page: pageParam - 1,
      size: sizeParam,
      sortName: sortNameParam,
      searchName: searchNameParam,
      type: typeParam ? ASC : DESC,
      isActivate: isActivateParam === STATUS ? "" : status,
    };
  };

  const fetchProjects = (projectParams) => {
    dispatch(getProjects(id, projectParams));
  };

  useEffect(() => {
    dispatch(clearMessage());
    const projectParams = setProjectParams(
      searched,
      page,
      rowsPerPage,
      orderBy,
      order,
      status
    );
    fetchProjects(projectParams);
  }, [dispatch, page, rowsPerPage, orderBy, order, status]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }

    setProjects(storeProjects.data);
  }, [storeProjects.data]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      page === INITIAL_PAGE
        ? fetchProjects(setProjectParams())
        : setPage(INITIAL_PAGE);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searched]);

  const cancelSearch = () => {
    setSearched("");
  };

  const handleSort = (orderBy) => {
    setOrderBy(orderBy);
    setOrder(!order);
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDropdown = (e) => {
    setPage(INITIAL_PAGE);
    const { name, value } = e.target;

    if (name === STATUS_OPTION) setStatus(value);
    if (name === SIZE_OPTION) setRowsPerPage(value);

    return;
  };

  const handleOpenDialog = (project = null) => {
    setProject(
      project
        ? {
            name: _.get(project, PROJECT_NAME),
            clientName: _.get(project, CLIENT_NAME),
            color: _.get(project, COLOR),
            textColor: _.get(project, TEXT_COLOR),
            colorPattern: _.get(project, COLOR_PATTERN),
          }
        : DEFAULT_PROJECT
    );

    setOpenDialog(true);
  };

  const handleCreateProject = () => {
    dispatch(addProject(id, project))
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleReset = () => {
    setSearched("");
    setStatus(STATUS);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length);

  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={searched}
        setSearched={setSearched}
        cancelSearch={cancelSearch}
        status={status}
        handleChangeDropdown={handleChangeDropdown}
        project={project}
        setProject={setProject}
        isOpenDialog={isOpenDialog}
        setOpenDialog={setOpenDialog}
        handleOpenDialog={handleOpenDialog}
        handleCreateProject={handleCreateProject}
        handleReset={handleReset}
      />

      <Box className={classes.boxTable}>
        <ProjectsTable
          rows={projects}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleSort={handleSort}
          isLoading={storeProjects.isLoading}
        />
      </Box>

      <TableFooter
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={storeProjects.numPage}
        page={page}
      />

      {message ? (
        <Message
          message={message}
          isOpen={hasMessage}
          handleCloseMessage={handleCloseMessage}
          type={"error"}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}
