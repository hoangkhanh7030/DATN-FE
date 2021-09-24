import axios from "axios";
import { REPORTS_URL, WORKSPACES_URL } from "constants/index";
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
      return response.data;
    });
};

export const exportReportService = (id, params) => {
  return axios
    .get(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}/exportReport`,
      {
        params,
        headers: authHeader(),
        responseType: "blob",
      }
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "Report.xlsx");
      document.body.appendChild(a);
      a.click();
    });
};
