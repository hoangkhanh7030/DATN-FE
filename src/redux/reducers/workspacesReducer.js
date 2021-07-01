import * as actionTypes from "../constants";

const initialState = { data: [], message: "" };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_WORKSPACES_SUCCEED:
      return { ...state, data: payload };
    case actionTypes.GET_WORKSPACES_FAILED:
      return {
        ...state,
      };
    case actionTypes.ADD_WORKSPACES_SUCCEED:
      return { ...state, message: payload.message };
    case actionTypes.ADD_WORKSPACES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
