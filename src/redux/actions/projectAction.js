import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getProjectsService,
  addProjectService,
  editProjectService,
  deleteProjectService,
  archiveProjectService,
  importProjectsService,
  exportProjectsService,
} from "services/project-service";
import { getProjectsBookingService } from "containers/workspace/dialog/api";

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

export const exportProjects = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.EXPORT_PROJECTS,
  });

  return exportProjectsService(id).then(
    (data) => {
      dispatch({
        type: actionTypes.EXPORT_PROJECTS_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.EXPORT_PROJECTS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getProjectsBooking = (id, searchName) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PROJECTS_BOOKING,
  });

  return getProjectsBookingService(id, searchName).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_PROJECTS_BOOKING_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_PROJECTS_BOOKING_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
