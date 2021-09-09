import * as actionTypes from "redux/constants";
import { getReportService, exportReportService } from "services/report-service";
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

export const exportReport = (id, params) => (dispatch) => {
  dispatch({
    type: actionTypes.EXPORT_REPORT,
  });

  return exportReportService(id, params).then(
    (data) => {
      dispatch({
        type: actionTypes.EXPORT_REPORT_SUCCEED,
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
        type: actionTypes.EXPORT_REPORT_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
