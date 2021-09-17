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
  exportProjects,
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

const DEFAULT_PARAMS = {
  page: INITIAL_PAGE,
  size: INITIAL_ROWS_PER_PAGE,
  searchName: "",
  sortName: "",
  type: false,
  isActivate: STATUS,
};

export default function Projects() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { message } = useSelector((state) => state.message);
  const [errorImport, setErrorImport] = useState(false);
  const storeProjects = useSelector((state) => state.projects);
  const actionStatus = _.get(storeProjects, ACTION_STATUS);

  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [projects, setProjects] = useState([]);
  const [hasMessage, setOpenMessage] = useState(false);
  const [project, setProject] = useState(DEFAULT_PROJECT);
  const [projectID, setProjectID] = useState(null);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState({});

  const fetchProjects = () => {
    const data = {
      ...params,
      page: params.page - 1,
      type: params.type ? ASC : DESC,
      isActivate: params.isActivate === STATUS ? "" : params.isActivate,
    };
    dispatch(getProjects(id, data));
  };

  useEffect(() => {
    dispatch(clearMessage());
    fetchProjects();
  }, [id, params]);

  useEffect(() => {
    if (!storeProjects.data) {
      return;
    }

    setProjects(storeProjects.data);
  }, [storeProjects.data]);

  const keyUp = (event) => {
    const value = event.target.value;
    if (event.keyCode === 13 || value === "") {
      if (value !== params.searchName)
        setParams({
          ...params,
          searchName: value,
          page: INITIAL_PAGE,
        });
    }
  };

  const cancelSearch = () => {
    setParams({ ...params, searchName: "" });
  };

  const handleSort = (orderBy) => {
    setParams({ ...params, sortName: orderBy, type: !params.type });
  };

  const handleCloseMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setParams({ ...params, page: newPage });
  };

  const handleChangeDropdown = (e) => {
    const { name, value } = e.target;
    if (name === SIZE_OPTION)
      setParams({ ...params, page: INITIAL_PAGE, size: value });

    if (name === STATUS_OPTION)
      setParams({ ...params, page: INITIAL_PAGE, isActivate: value });

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
        setOpenMessage(true);
        if (params === DEFAULT_PARAMS) fetchProjects();
        else handleReset();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleEditProject = (editedProject, projectID) => {
    dispatch(editProject(id, projectID, editedProject))
      .then(() => {
        setOpenMessage(true);
        fetchProjects();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleDeleteProject = (projectID) => {
    dispatch(deleteProject(id, projectID))
      .then(() => {
        setOpenMessage(true);
        if (_.size(projects) === 1)
          setParams({
            ...params,
            page: params.page - 1,
          });
        else fetchProjects();
      })
      .catch(() => {
        setOpenMessage(true);
      });
  };

  const handleArchiveProject = (projectID) => {
    dispatch(archiveProject(id, projectID))
      .then(() => {
        fetchProjects();
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
          handleReset();
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

  const handleExportProjects = () => {
    dispatch(exportProjects(id));
  };

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
  };

  const emptyRows = params.size - Math.min(params.size, projects.length);

  return (
    <ThemeProvider theme={theme}>
      <TableHeader
        searched={params.searchName}
        keyUp={keyUp}
        cancelSearch={cancelSearch}
        status={params.isActivate}
        handleChangeDropdown={handleChangeDropdown}
        handleOpenDialog={handleOpenDialog}
        handleReset={handleReset}
        handleImportProjects={handleImportProjects}
        handleExportProjects={handleExportProjects}
      />

      <Box className={classes.boxTable}>
        <ProjectsTable
          rows={projects}
          page={params.page}
          rowsPerPage={params.size}
          emptyRows={emptyRows}
          handleSort={handleSort}
          isLoading={storeProjects.isLoading}
          handleOpenDialog={handleOpenDialog}
          handleDeleteProject={handleDeleteProject}
          handleArchiveProject={handleArchiveProject}
        />
      </Box>

      <TableFooter
        rowsPerPage={params.size}
        handleChangePage={handleChangePage}
        handleChangeDropdown={handleChangeDropdown}
        numPage={storeProjects.numPage}
        page={params.page}
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
        projects={projects}
      />
    </ThemeProvider>
  );
}
