import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormDialog } from "components/projects/form_dialog/FormDiaLog";
import { ThemeProvider, Box } from "@material-ui/core";

import ProjectsTable from "./Table";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

import { Message } from "components/common/Message";

import {
  getProjects,
  addProject,
  editProject,
  deleteProject,
  archiveProject,
  importProjects,
} from "redux/actions/projectAction";
import { setMessage, clearMessage } from "redux/actions/msgAction";

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
  IS_ACTIVATED,
  ID,
  ACTION_STATUS,
  SUCCESS,
  ERROR,
  BTN_SAVE,
  BTN_CONFIRM,
} from "constants/index";

import * as _ from "underscore";

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { message } = useSelector((state) => state.message);
  const [errorImport, setErrorImport] = useState(false);

  const [projects, setProjects] = useState([]);

  const [searched, setSearched] = useState("");

  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);

  const [hasMessage, setOpenMessage] = useState(false);

  const storeProjects = useSelector((state) => state.projects);
  const actionStatus = _.get(storeProjects, ACTION_STATUS);

  const [status, setStatus] = useState(STATUS);

  const [order, setOrder] = useState(false);

  const [orderBy, setOrderBy] = useState("");

  const [project, setProject] = useState(DEFAULT_PROJECT);
  const [projectID, setProjectID] = useState(null);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState({});

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
  }, [id, dispatch, page, rowsPerPage, orderBy, order, status]);

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
            isActivate: _.get(project, IS_ACTIVATED),
          }
        : DEFAULT_PROJECT
    );
    setProjectID(_.get(project, ID));
    setDialog({
      dialogTitle: project ? "Edit project" : "Add project",
      buttonText: project ? BTN_SAVE : BTN_CONFIRM,
      actionDialog: project ? handleEditProject : handleCreateProject,
    });
    setOpenDialog(true);
  };

  const handleCreateProject = (newProject) => {
    dispatch(addProject(id, newProject))
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleEditProject = (editedProject, projectID) => {
    dispatch(editProject(id, projectID, editedProject))
      .then(() => {
        setOpenMessage(true);
        fetchProjects(setProjectParams());
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleDeleteProject = (projectID) => {
    dispatch(deleteProject(id, projectID))
      .then(() => {
        setOpenMessage(true);
        fetchProjects(setProjectParams());
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleArchiveProject = (projectID) => {
    dispatch(archiveProject(id, projectID))
      .then(() => {
        fetchProjects(setProjectParams());
        setOpenMessage(true);
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleImportProjects = (file) => {
    if (file.type === "application/vnd.ms-excel") {
      dispatch(importProjects(id, file))
        .then(() => {
          fetchProjects(setProjectParams());
          setOpenMessage(true);
        })
        .catch(() => {
          setOpenMessage(true);
        });
    } else {
      dispatch(setMessage("Wrong type of file. Please choose csv file!"));
      setErrorImport(true);
      setOpenMessage(true);
      setErrorImport(false);
    }
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
        handleOpenDialog={handleOpenDialog}
        handleReset={handleReset}
        handleImportProjects={handleImportProjects}
      />

      <Box className={classes.boxTable}>
        <ProjectsTable
          rows={projects}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleSort={handleSort}
          isLoading={storeProjects.isLoading}
          handleOpenDialog={handleOpenDialog}
          handleDeleteProject={handleDeleteProject}
          handleArchiveProject={handleArchiveProject}
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
          type={actionStatus === 200 ? SUCCESS : ERROR}
        />
      ) : (
        <></>
      )}

      <FormDialog
        project={project}
        projectID={projectID}
        setProject={setProject}
        isOpenDialog={isOpenDialog}
        setOpenDialog={setOpenDialog}
        dialog={dialog}
      />
    </ThemeProvider>
  );
}
