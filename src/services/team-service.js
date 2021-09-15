import axios from "axios";
import { WORKSPACES_URL, TEAMS_URL } from "constants/index";
import authHeader from "./data-service";

export const getTeamsService = (workspaceId) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${workspaceId}${TEAMS_URL}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const addTeamsService = (id, data) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}${TEAMS_URL}`,
      // process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}/team`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const updateTeamsService = (id, data) => {
  return axios
    .put(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}${TEAMS_URL}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
