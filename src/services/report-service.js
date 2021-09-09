import axios from "axios";
import {
  REPORTS_URL, WORKSPACES_URL
} from "constants/index";
import authHeader from "./data-service";

export const getReportService = (workspaceId, params) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${workspaceId}${REPORTS_URL}`,
      {
        params: params,
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
