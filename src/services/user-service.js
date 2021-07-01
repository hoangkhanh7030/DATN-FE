import axios from "axios";
import authHeader from "./data-service";

const baseURL = "https://hr-resource-app.herokuapp.com/api/v1";

export const getWorkspacesService = () => {
  return axios
    .get(baseURL + "/workspaces", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
