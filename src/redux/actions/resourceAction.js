import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getResourcesService } from "services/resource-service";

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
