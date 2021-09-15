import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getTeamsService,
  addTeamsService,
  updateTeamsService,
} from "services/team-service";

export const getTeams = (workspaceId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAMS,
  });

  return getTeamsService(workspaceId).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_TEAMS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_TEAMS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addTeams = (id, data) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TEAMS,
  });

  return addTeamsService(id, data).then(
    (data) => {
      dispatch({
        type: actionTypes.ADD_TEAMS_SUCCEED,
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
        type: actionTypes.ADD_TEAMS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateTeams = (id, data) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_TEAMS,
  });

  return updateTeamsService(id, data).then(
    (data) => {
      dispatch({
        type: actionTypes.UPDATE_TEAMS_SUCCEED,
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
        type: actionTypes.UPDATE_TEAMS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
