import axios from "axios";
import { WORKSPACES_URL, PROJECTS_URL } from "constants/index";
import authHeader from "./data-service";

export const getProjectsService = (
  id,
  page,
  size,
  searched,
  order,
  orderBy,
  status
) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${PROJECTS_URL}?page=${page}&size=${size}&sortName=${orderBy}&searchName=${searched}&type=${order}&isActivate=${status}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
