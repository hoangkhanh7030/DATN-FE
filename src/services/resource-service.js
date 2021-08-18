import axios from "axios";
import { RESOURCES_URL, WORKSPACES_URL } from "constants/index";
import authHeader from "./data-service";

export const getResourcesService = (workspaceId, resourceParams) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${workspaceId}${RESOURCES_URL}`,
      {
        params: resourceParams,
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const addResourceService = (id, data) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}${RESOURCES_URL}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const editResourceService = (id, resourceId, data) => {
  return axios
    .put(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}${RESOURCES_URL}/${resourceId}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
