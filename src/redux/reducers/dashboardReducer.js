import * as actionTypes from "redux/constants";

const initialState = { data: [], isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BOOKINGS:
      return { ...state, isLoading: true };

    case actionTypes.GET_BOOKINGS_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_BOOKINGS_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.DELETE_BOOKING:
      return { ...state, isLoading: true };

    case actionTypes.DELETE_BOOKING_SUCCEED:
      return { ...state, data: payload, isLoading: false };

    case actionTypes.DELETE_BOOKING_FAILED:
      return { ...state, data: payload, isLoading: false };

    case actionTypes.RENAME_TEAM:
      return { ...state, isLoading: true };

    case actionTypes.RENAME_TEAM_SUCCEED:
      return { ...state, data: payload, isLoading: false };

    case actionTypes.RENAME_TEAM_FAILED:
      return { ...state, data: payload, isLoading: false };

    default:
      return state;
  }
}
