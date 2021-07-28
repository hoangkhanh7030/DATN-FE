import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getProjectsService } from "services/project-service";

export const getProjects = (id, projectParams) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PROJECTS,
  });

  return getProjectsService(id, projectParams).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_PROJECTS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.GET_PROJECTS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
