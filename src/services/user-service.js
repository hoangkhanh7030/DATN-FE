import axios from "axios";
import { WORKSPACES_URL, USERS_URL, ASC, DESC } from "constants/index";
import authHeader from "./data-service";

export const getUsersService = (id, params) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}${WORKSPACES_URL}/${id}${USERS_URL}`,
      {
        params: {
          ...params,
          page: params.page - 1,
          type: params.type ? DESC : ASC,
        },
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
