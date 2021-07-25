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
