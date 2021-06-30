import * as actionTypes from "../contants";

import { loginService, logoutService } from "../../services/auth-service";

export const login = (loginData) => (dispatch) => {
  return loginService(loginData).then(
    (data) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCEED,
        payload: { user: data },
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
