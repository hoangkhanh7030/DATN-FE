import * as actionTypes from "redux/constants";

const initialState = {
  data: null,
  status: null,
  isLoading: false,
  pageSize: 1,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_RESOURCES:
      return { ...state, data: [], isLoading: true };

    case actionTypes.GET_RESOURCES_SUCCEED:
      return {
        ...state,
        data: payload.list,
        pageSize: payload.pageSize,
        isLoading: false,
      };

    case actionTypes.GET_RESOURCES_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.ADD_RESOURCE:
      return { ...state, isLoading: true };

    case actionTypes.ADD_RESOURCE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.ADD_RESOURCE_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.EDIT_RESOURCE:
      return { ...state, isLoading: true };

    case actionTypes.EDIT_RESOURCE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.EDIT_RESOURCE_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.DELETE_RESOURCE:
      return { ...state, isLoading: true };

    case actionTypes.DELETE_RESOURCE_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.DELETE_RESOURCE_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.EXPORT_RESOURCES:
      return { ...state, isLoading: true };

    case actionTypes.EXPORT_RESOURCES_SUCCEED:
      return { ...state, isLoading: false };

    case actionTypes.EXPORT_RESOURCES_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.IMPORT_RESOURCES:
      return { ...state, isLoading: true };

    case actionTypes.IMPORT_RESOURCES_SUCCEED:
      return {
        ...state,
        status: payload.status,
        isLoading: false,
      };

    case actionTypes.IMPORT_RESOURCES_FAILED:
      return { ...state, status: payload.status, isLoading: false };

    case actionTypes.GET_RESOURCES_BOOKING:
      return { ...state, data: [], isLoading: true };

    case actionTypes.GET_RESOURCES_BOOKING_SUCCEED:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };

    case actionTypes.GET_RESOURCES_BOOKING_FAILED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
