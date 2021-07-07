import axios from "axios";
import { WORKSPACES_URL } from "constants/index";
import authHeader from "./data-service";

export const getWorkspacesService = () => {
  return axios
    .get(process.env.REACT_APP_API_URL + WORKSPACES_URL, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export const addWorkspaceService = (data) => {
  return axios
    .post(process.env.REACT_APP_API_URL + WORKSPACES_URL, data, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export const updateWorkspaceService = (data, id) => {
  return axios
    .put(process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}`, data, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export const deleteWorkspaceService = (id) => {
  return axios
    .delete(process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
