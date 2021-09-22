import * as actionTypes from "redux/constants";

const initialState = { data: null, numPage: 1, status: null, adminId: null };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_USERS:
      return { ...state };

    case actionTypes.GET_USERS_SUCCEED:
      return {
        ...state,
        data: payload.manageUsers,
        numPage: payload.numberSize,
        adminId: payload.adminId,
      };

    case actionTypes.GET_USERS_FAILED:
      return { ...state };

    case actionTypes.ARCHIVE_USER:
      return { ...state };

    case actionTypes.ARCHIVE_USER_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.ARCHIVE_USER_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_USER:
      return { ...state };

    case actionTypes.DELETE_USER_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_USER_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.RE_INVITE_USER:
      return { ...state };

    case actionTypes.RE_INVITE_USER_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.RE_INVITE_USER_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.INVITE_TO_WORKSPACE:
      return { ...state };

    case actionTypes.INVITE_TO_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
      };

    case actionTypes.INVITE_TO_WORKSPACE_FAILED:
      return { ...state };

    default:
      return state;
  }
}
