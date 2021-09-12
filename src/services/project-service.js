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

export const addProjectService = (id, data) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${PROJECTS_URL}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const editProjectService = (id, projectID, data) => {
  return axios
    .put(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}${PROJECTS_URL}/${projectID}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteProjectService = (id, projectID) => {
  return axios
    .delete(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}${PROJECTS_URL}/${projectID}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
