import * as actionTypes from "redux/constants";

const initialState = { data: null, numPage: 1, status: null };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROJECTS:
      return { ...state };

    case actionTypes.GET_PROJECTS_SUCCEED:
      return {
        ...state,
        data: payload.projectDTOList,
        numPage: payload.numberSize,
      };

    case actionTypes.GET_PROJECTS_FAILED:
      return { ...state };

    case actionTypes.ADD_PROJECT:
      return { ...state };

    case actionTypes.ADD_PROJECT_SUCCEED:
      return {
        ...state,
        status: payload.status,
      };

    case actionTypes.ADD_PROJECT_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.EDIT_PROJECT:
      return { ...state };

    case actionTypes.EDIT_PROJECT_SUCCEED:
      return {
        ...state,
        status: payload.status,
      };

    case actionTypes.EDIT_PROJECT_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_PROJECT:
      return { ...state };

    case actionTypes.DELETE_PROJECT_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_PROJECT_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.ARCHIVE_PROJECT:
      return { ...state };

    case actionTypes.ARCHIVE_PROJECT_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.ARCHIVE_PROJECT_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.IMPORT_PROJECTS:
      return { ...state };

    case actionTypes.IMPORT_PROJECTS_SUCCEED:
      return { ...state, status: 200 };

    case actionTypes.IMPORT_PROJECTS_FAILED:
      return { ...state, status: 400 };

    case actionTypes.EXPORT_PROJECTS:
      return { ...state };

    case actionTypes.EXPORT_PROJECTS_SUCCEED:
      return { ...state, status: 200 };

    case actionTypes.EXPORT_PROJECTS_FAILED:
      return { ...state, status: 400 };

    case actionTypes.GET_PROJECTS_BOOKING:
      return { ...state };

    case actionTypes.GET_PROJECTS_BOOKING_SUCCEED:
      return {
        ...state,
        data: payload,
      };

    case actionTypes.GET_PROJECTS_BOOKING_FAILED:
      return { ...state };

    default:
      return state;
  }
}
