import * as actionTypes from "../constants";

import {
  addWorkspaceService,
  getWorkspacesService,
} from "../../services/user-service";

export const getWorkspaces = () => (dispatch) => {
  return getWorkspacesService().then(
    (data) => {
      dispatch({
        type: actionTypes.GET_WORKSPACES_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: actionTypes.GET_WORKSPACES_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addWorkspace = (createdData) => (dispatch) => {
  return addWorkspaceService(createdData).then(
    (data) => {
      dispatch({
        type: actionTypes.ADD_WORKSPACES_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: actionTypes.ADD_WORKSPACES_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
