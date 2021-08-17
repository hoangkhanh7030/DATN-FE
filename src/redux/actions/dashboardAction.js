import * as actionTypes from "redux/constants";
import * as _ from "underscore";

import {
  getBookingsService,
  deleteBookingService,
  renameTeamService,
} from "services/dashboard-service";

export const getBookings = (id, params) => (dispatch) => {
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

export const deleteBooking = (id, bookingId) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_BOOKING,
  });

  return deleteBookingService(id, bookingId).then(
    (data) => {
      dispatch({
        type: actionTypes.DELETE_BOOKING_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: _.get(data, "message"),
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.DELETE_BOOKING_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const renameTeam = (id, params) => (dispatch) => {
  dispatch({
    type: actionTypes.RENAME_TEAM,
  });

  return renameTeamService(id, params).then(
    (data) => {
      dispatch({
        type: actionTypes.RENAME_TEAM_SUCCEED,
        payload: data,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: _.get(data, "message"),
      });
      return Promise.resolve();
    },
    (error) => {
      const message = _.get(error, ["response", "data", "error"]);
      dispatch({
        type: actionTypes.RENAME_TEAM_FAILED,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
