import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getPositionsService } from "services/position-service";

export const getPositions = (workspaceId, teamId) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_POSITIONS,
  });

  return getPositionsService(workspaceId, teamId).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_POSITIONS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_POSITIONS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
