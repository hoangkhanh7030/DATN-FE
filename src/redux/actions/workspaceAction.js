import * as actionTypes from "../constants";

import {
  addWorkspaceService,
  getWorkspacesService,
  updateWorkspaceService,
  deleteWorkspaceService,
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
        type: actionTypes.ADD_WORKSPACE_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
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
        type: actionTypes.ADD_WORKSPACE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateWorkspace = (updatedData, id) => (dispatch) => {
  return updateWorkspaceService(updatedData, id).then(
    (data) => {
      dispatch({
        type: actionTypes.UPDATE_WORKSPACE_SUCCEED,
        payload: data,
      });
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
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
        type: actionTypes.UPDATE_WORKSPACE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteWorkspace = (id) => (dispatch) => {
  return deleteWorkspaceService(id).then(
    (data) => {
      dispatch({
        type: actionTypes.DELETE_WORKSPACE_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
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
        type: actionTypes.DELETE_WORKSPACE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
