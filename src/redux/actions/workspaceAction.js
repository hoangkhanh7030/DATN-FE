import * as actionTypes from "redux/constants";

import {
  addWorkspaceService,
  getWorkspacesService,
  updateWorkspaceService,
  deleteWorkspaceService,
} from "services/user-service";

export const getWorkspaces = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_WORKSPACES,
  });

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
        error.response && error.response.data && error.response.data.error;

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
  dispatch({
    type: actionTypes.ADD_WORKSPACE,
  });

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
        error.response && error.response.data && error.response.data.error;
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
  dispatch({
    type: actionTypes.UPDATE_WORKSPACE,
  });

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
        error.response && error.response.data && error.response.data.error;
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
  dispatch({
    type: actionTypes.DELETE_WORKSPACE,
  });

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
        error.response && error.response.data && error.response.data.error;

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
