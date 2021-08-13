import axios from "axios";
import { WORKSPACES_URL } from "constants/index";
import authHeader from "./data-service";

export const getBookingsService = (id, dashboardParams) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}/bookings`, {
      params: dashboardParams,
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
