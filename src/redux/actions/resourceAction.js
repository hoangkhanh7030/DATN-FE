import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getResourcesService,
  addResourceService,
} from "services/resource-service";

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
