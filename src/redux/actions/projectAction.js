import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getProjectsService,
  addProjectService,
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
