import * as actionTypes from "redux/constants";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, isLoading: false }
  : { isLoggedIn: false, user: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOGIN:
      return { ...state, isLoading: true };

    case actionTypes.LOGIN_SUCCEED:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
        isLoading: false,
      };

    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
