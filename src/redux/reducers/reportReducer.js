import * as actionTypes from "redux/constants";

const initialState = {
  data: null,
  status: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_REPORT:
      return { ...state };

    case actionTypes.GET_REPORT_SUCCEED:
      return { ...state, data: payload };

    case actionTypes.GET_REPORT_FAILED:
      return { ...state };

    case actionTypes.EXPORT_REPORT:
      return { ...state };

    case actionTypes.EXPORT_REPORT_SUCCEED:
      return { ...state, status: 200 };

    case actionTypes.EXPORT_REPORT_FAILED:
      return { ...state, status: payload.status };

    default:
      return state;
  }
}
