import * as actionTypes from "redux/constants";

const initialState = { data: null, status: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_TEAMS:
      return { ...state, isLoading: true };

    case actionTypes.GET_TEAMS_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_TEAMS_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
