import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getEmailsService } from "services/email-service";

export const getEmails = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_EMAILS,
  });

  return getEmailsService(id).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_EMAILS_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);

      dispatch({
        type: actionTypes.GET_EMAILS_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
