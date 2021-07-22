import axios from "axios";
import { WORKSPACES_URL, PROJECTS_URL } from "constants/index";
import authHeader from "./data-service";

export const getProjectsService = (id, projectParams) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${PROJECTS_URL}`,
      {
        params: projectParams,
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
