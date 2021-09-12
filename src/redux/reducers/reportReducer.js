import * as actionTypes from "redux/constants";

const initialState = {
  data: null,
  status: null,
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_REPORT:
      return { ...state, isLoading: true };

    case actionTypes.GET_REPORT_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_REPORT_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.EXPORT_REPORT:
      return { ...state, isLoading: true };

    case actionTypes.EXPORT_REPORT_SUCCEED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.EXPORT_REPORT_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    default:
      return state;
  }
}
