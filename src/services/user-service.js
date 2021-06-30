import axios from "axios";
import authHeader from "./auth-header";

const baseURL = "https://hr-resource-app.herokuapp.com/";

export const getWorkspaces = () => {
  return axios.get(baseURL + "workspaces", { headers: authHeader() });
};
