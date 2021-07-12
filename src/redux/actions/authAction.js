import * as actionTypes from "redux/constants";
import { loginService, logoutService } from "services/auth-service";
import * as _ from "underscore";
export const login = (loginData) => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN,
  });

  return loginService(loginData).then(
    (data) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCEED,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);

      dispatch({
        type: actionTypes.LOGIN_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  logoutService();

  dispatch({
    type: actionTypes.LOGOUT,
  });
};
