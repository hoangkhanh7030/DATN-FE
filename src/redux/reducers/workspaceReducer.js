import * as actionTypes from "redux/constants";

const initialState = { data: [], status: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_WORKSPACES:
      return { ...state, isLoading: true };

    case actionTypes.GET_WORKSPACES_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_WORKSPACES_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.ADD_WORKSPACE:
      return { ...state, isLoading: true };

    case actionTypes.ADD_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.ADD_WORKSPACE_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.UPDATE_WORKSPACE:
      return { ...state, isLoading: true };

    case actionTypes.UPDATE_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.UPDATE_WORKSPACE_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.DELETE_WORKSPACE:
      return { ...state, isLoading: true };

    case actionTypes.DELETE_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.DELETE_WORKSPACE_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.INVITE_TO_WORKSPACE:
      return { ...state, isLoading: true };

    case actionTypes.INVITE_TO_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.INVITE_TO_WORKSPACE_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
