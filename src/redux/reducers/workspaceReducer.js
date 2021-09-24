import * as actionTypes from "redux/constants";

const initialState = { data: [], status: null };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_WORKSPACES:
      return { ...state };

    case actionTypes.GET_WORKSPACES_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_WORKSPACES_FAILED:
      return { ...state };

    case actionTypes.ADD_WORKSPACE:
      return { ...state };

    case actionTypes.ADD_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.ADD_WORKSPACE_FAILED:
      return { ...state };

    case actionTypes.UPDATE_WORKSPACE:
      return { ...state };

    case actionTypes.UPDATE_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.UPDATE_WORKSPACE_FAILED:
      return { ...state };

    case actionTypes.DELETE_WORKSPACE:
      return { ...state };

    case actionTypes.DELETE_WORKSPACE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.DELETE_WORKSPACE_FAILED:
      return { ...state };

    default:
      return state;
  }
}
