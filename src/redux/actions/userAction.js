import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getUsersService } from "services/user-service";

export const getUsers = (id, params) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_USERS,
  });

  return getUsersService(id, params).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_USERS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_USERS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
