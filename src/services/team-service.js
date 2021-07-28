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
