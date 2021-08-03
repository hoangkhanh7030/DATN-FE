import axios from "axios";
import { WORKSPACES_URL, POSITIONS_URL, TEAM_URL } from "constants/index";
import authHeader from "./data-service";

export const getPositionsService = (workspaceId, teamId) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${workspaceId}${TEAM_URL}/${teamId}${POSITIONS_URL}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
