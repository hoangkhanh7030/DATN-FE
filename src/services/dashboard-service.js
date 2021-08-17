import axios from "axios";
import { WORKSPACES_URL, DASHBOARD_URL } from "constants/index";
import authHeader from "./data-service";

export const getBookingsService = (id, dashboardParams) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${DASHBOARD_URL}`,
      {
        params: dashboardParams,
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteBookingService = (id, bookingId) => {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${DASHBOARD_URL}/${bookingId}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const renameTeamService = (id, params) => {
  const data = { name: params.name };

  return axios
    .put(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}/team/${params.teamId}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
