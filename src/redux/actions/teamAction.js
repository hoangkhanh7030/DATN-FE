import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getTeamsService } from "services/team-service";

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
