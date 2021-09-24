import * as actionTypes from "redux/constants";

const initialState = {
  data: null,
  status: null,
  pageSize: 1,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_RESOURCES:
      return { ...state };

    case actionTypes.GET_RESOURCES_SUCCEED:
      return {
        ...state,
        data: payload.list,
        pageSize: payload.pageSize,
      };

    case actionTypes.GET_RESOURCES_FAILED:
      return { ...state };

    case actionTypes.ADD_RESOURCE:
      return { ...state };

    case actionTypes.ADD_RESOURCE_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.ADD_RESOURCE_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.EDIT_RESOURCE:
      return { ...state };

    case actionTypes.EDIT_RESOURCE_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.EDIT_RESOURCE_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_RESOURCE:
      return { ...state };

    case actionTypes.DELETE_RESOURCE_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.DELETE_RESOURCE_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.EXPORT_RESOURCES:
      return { ...state };

    case actionTypes.EXPORT_RESOURCES_SUCCEED:
      return { ...state, status: 200 };

    case actionTypes.EXPORT_RESOURCES_FAILED:
      return { ...state };

    case actionTypes.IMPORT_RESOURCES:
      return { ...state };

    case actionTypes.IMPORT_RESOURCES_SUCCEED:
      return { ...state, status: 200 };

    case actionTypes.IMPORT_RESOURCES_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.ARCHIVE_RESOURCE:
      return { ...state };

    case actionTypes.ARCHIVE_RESOURCE_SUCCEED:
      return { ...state, status: payload.status };

    case actionTypes.ARCHIVE_RESOURCE_FAILED:
      return { ...state, status: payload.status };

    case actionTypes.GET_RESOURCES_BOOKING:
      return { ...state, data: [] };

    case actionTypes.GET_RESOURCES_BOOKING_SUCCEED:
      return { ...state, data: payload };

    case actionTypes.GET_RESOURCES_BOOKING_FAILED:
      return { ...state };

    default:
      return state;
  }
}
