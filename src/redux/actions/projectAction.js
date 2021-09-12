import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getProjectsService,
  addProjectService,
  editProjectService,
  deleteProjectService,
  archiveProjectService,
  importProjectsService,
} from "services/project-service";

export const getProjects = (id, projectParams) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PROJECTS,
  });

  return getProjectsService(id, projectParams).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_PROJECTS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_PROJECTS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addProject = (id, data) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_PROJECT,
  });

  return addProjectService(id, data).then(
    (data) => {
      dispatch({
        type: actionTypes.ADD_PROJECT_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.ADD_PROJECT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editProject = (id, projectID, data) => (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_PROJECT,
  });

  return editProjectService(id, projectID, data).then(
    (data) => {
      dispatch({
        type: actionTypes.EDIT_PROJECT_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.EDIT_PROJECT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteProject = (id, projectID) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_PROJECT,
  });

  return deleteProjectService(id, projectID).then(
    (data) => {
      dispatch({
        type: actionTypes.DELETE_PROJECT_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.DELETE_PROJECT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const archiveProject = (id, projectId) => (dispatch) => {
  dispatch({
    type: actionTypes.ARCHIVE_PROJECT,
  });

  return archiveProjectService(id, projectId).then(
    (data) => {
      dispatch({
        type: actionTypes.ARCHIVE_PROJECT_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.ARCHIVE_PROJECT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const importProjects = (id, file) => (dispatch) => {
  dispatch({
    type: actionTypes.IMPORT_PROJECTS,
  });

  return importProjectsService(id, file).then(
    (data) => {
      dispatch({
        type: actionTypes.IMPORT_PROJECTS_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.IMPORT_PROJECTS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
