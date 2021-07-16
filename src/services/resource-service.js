import axios from "axios";
import { RESOURCES_URL, WORKSPACES_URL, EXPORT_URL, RESPONSE_TYPE, DOWNLOAD, RESOURCES_CSV } from "constants/index";
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

export const deleteResourceService = (id, resourceId) => {
  return axios
    .delete(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}${RESOURCES_URL}/${resourceId}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const exportResourcesService = (id) => {
  return axios
    .get(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}${RESOURCES_URL}${EXPORT_URL}`,
      {
        headers: authHeader(),
        responseType: RESPONSE_TYPE,
      }
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute(DOWNLOAD, RESOURCES_CSV);
      document.body.appendChild(a);
      a.click();
    });
};
