import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import { getBookingsService } from "services/dashboard-service";

export const getBookings =
  (id, params) => (dispatch) => {
    dispatch({
      type: actionTypes.GET_BOOKINGS,
    });

    return getBookingsService(id, params).then(
      (data) => {
        dispatch({
          type: actionTypes.GET_BOOKINGS_SUCCEED,
          payload: data,
        });

        return Promise.resolve();
      },
      (error) => {
        const message = _.get(error, ["response", "data", "error"]);
        dispatch({
          type: actionTypes.GET_BOOKINGS_FAILED,
        });

        dispatch({
          type: actionTypes.SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };
