import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getResourcesService,
  addResourceService,
  editResourceService,
  deleteResourceService,
  exportResourcesService,
  importResourcesService,
} from "services/resource-service";
import { getResourcesBookingService } from "containers/workspace/dialog/api";

export const getResources = (id, resourceParams) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_RESOURCES,
  });

  return getResourcesService(id, resourceParams).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_RESOURCES_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);

      dispatch({
        type: actionTypes.GET_RESOURCES_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addResource = (id, data) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_RESOURCE,
  });

  return addResourceService(id, data).then(
    (data) => {
      dispatch({
        type: actionTypes.ADD_RESOURCE_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.ADD_RESOURCE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editResource = (id, resourceId, data) => (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_RESOURCE,
  });

  return editResourceService(id, resourceId, data).then(
    (data) => {
      dispatch({
        type: actionTypes.EDIT_RESOURCE_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.EDIT_RESOURCE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteResource = (id, resourceId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_RESOURCE,
  });

  return deleteResourceService(id, resourceId).then(
    (data) => {
      dispatch({
        type: actionTypes.DELETE_RESOURCE_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.DELETE_RESOURCE_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const exportResources = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.EXPORT_RESOURCES,
  });

  return exportResourcesService(id).then(
    (data) => {
      dispatch({
        type: actionTypes.EXPORT_RESOURCES_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.EXPORT_RESOURCES_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const importResources = (id, file) => (dispatch) => {
  dispatch({
    type: actionTypes.IMPORT_RESOURCES,
  });

  return importResourcesService(id, file).then(
    (data) => {
      dispatch({
        type: actionTypes.IMPORT_RESOURCES_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.IMPORT_RESOURCES_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getResourcesBooking = (id, searchName) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_RESOURCES_BOOKING,
  });

  return getResourcesBookingService(id, searchName).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_RESOURCES_BOOKING_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);

      dispatch({
        type: actionTypes.GET_RESOURCES_BOOKING_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
