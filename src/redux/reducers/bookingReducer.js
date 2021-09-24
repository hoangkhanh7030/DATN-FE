import * as actionTypes from "redux/constants";

const initialState = {  status: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_BOOKING:
      return { ...state, isLoading: true };

    case actionTypes.ADD_BOOKING_SUCCEED:
      return {
        ...state,
        status: 200,
        isLoading: false,
      };

    case actionTypes.ADD_BOOKING_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.EDIT_BOOKING:
      return { ...state, isLoading: true };

    case actionTypes.EDIT_BOOKING_SUCCEED:
      return {
        ...state,
        status: 200,
        isLoading: false,
      };

    case actionTypes.EDIT_BOOKING_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
