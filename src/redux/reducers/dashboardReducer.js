import * as actionTypes from "redux/constants";

const initialState = { data: [] };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BOOKINGS:
      return { ...state, data: [] };

    case actionTypes.GET_BOOKINGS_SUCCEED:
      return { ...state, data: payload };

    case actionTypes.GET_BOOKINGS_FAILED:
      return { ...state };

    case actionTypes.DELETE_BOOKING:
      return { ...state };

    case actionTypes.DELETE_BOOKING_SUCCEED:
      return { ...state, data: payload };

    case actionTypes.DELETE_BOOKING_FAILED:
      return { ...state, data: payload };

    case actionTypes.RENAME_TEAM:
      return { ...state };

    case actionTypes.RENAME_TEAM_SUCCEED:
      return { ...state, data: payload };

    case actionTypes.RENAME_TEAM_FAILED:
      return { ...state, data: payload };

    default:
      return state;
  }
}
