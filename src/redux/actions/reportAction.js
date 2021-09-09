import * as actionTypes from "redux/constants";
import { getReportService } from "services/report-service";
import * as _ from "underscore";

export const getReport = (id, params) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_REPORT,
  });

  return getReportService(id, params).then(
    (data) => {
      dispatch({
        type: actionTypes.GET_REPORT_SUCCEED,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);

      dispatch({
        type: actionTypes.GET_REPORT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
