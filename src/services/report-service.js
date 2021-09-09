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
      console.log(response.data);
      return response.data;
    });
};

export const exportReportService = (id) => {
  return axios
    .get(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}/exportReport?startDate=2021-01-01&endDate=2021-12-30&type=DAY`,
      {
        headers: authHeader(),
        responseType: "blob",
      }
    )
    .then((response) => {
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "Report.csv");
      document.body.appendChild(a);
      a.click();
    });
};
