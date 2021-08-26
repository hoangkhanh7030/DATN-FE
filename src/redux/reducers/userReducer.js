import * as actionTypes from "redux/constants";

const initialState = { data: [], numPage: 1, status: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_USERS:
      return { ...state, isLoading: true };

    case actionTypes.GET_USERS_SUCCEED:
      return {
        ...state,
        data: payload.manageUsers,
        numPage: payload.numberSize,
        isLoading: false,
      };

    case actionTypes.GET_USERS_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
