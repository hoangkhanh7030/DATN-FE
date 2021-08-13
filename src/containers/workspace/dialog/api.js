import axios from "axios";
import { WORKSPACES_URL, PROJECTS_URL, RESOURCES_URL } from "constants/index";
import authHeader from "services/data-service";

export const getProjectsBookingService = (id, searchName) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}/bookings${PROJECTS_URL}?searchName=${searchName}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const getResourcesBookingService = (id, searchName) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}/bookings${RESOURCES_URL}?searchName=${searchName}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
