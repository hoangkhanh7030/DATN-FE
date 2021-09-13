import * as actionTypes from "redux/constants";

const initialState = { data: null, numPage: 1, status: null, isLoading: false };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROJECTS:
      return { ...state, isLoading: true };

    case actionTypes.GET_PROJECTS_SUCCEED:
      return {
        ...state,
        data: payload.projectDTOList,
        numPage: payload.numberSize,
        isLoading: false,
      };

    case actionTypes.GET_PROJECTS_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.ADD_PROJECT:
      return { ...state, isLoading: true };

    case actionTypes.ADD_PROJECT_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.ADD_PROJECT_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.EDIT_PROJECT:
      return { ...state, isLoading: true };

    case actionTypes.EDIT_PROJECT_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.EDIT_PROJECT_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.DELETE_PROJECT:
      return { ...state, isLoading: true };

    case actionTypes.DELETE_PROJECT_SUCCEED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.DELETE_PROJECT_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.ARCHIVE_PROJECT:
      return { ...state, isLoading: true };

    case actionTypes.ARCHIVE_PROJECT_SUCCEED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.ARCHIVE_PROJECT_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.IMPORT_PROJECTS:
      return { ...state, isLoading: true };

    case actionTypes.IMPORT_PROJECTS_SUCCEED:
      return { ...state, isLoading: false };

    case actionTypes.IMPORT_PROJECTS_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.EXPORT_PROJECTS:
      return { ...state, isLoading: true };

    case actionTypes.EXPORT_PROJECTS_SUCCEED:
      return { ...state, isLoading: false };

    case actionTypes.EXPORT_PROJECTS_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.GET_PROJECTS_BOOKING:
      return { ...state, isLoading: true };

    case actionTypes.GET_PROJECTS_BOOKING_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_PROJECTS_BOOKING_FAILED:
      return { ...state, isLoading: false };
      
    default:
      return state;
  }
}
