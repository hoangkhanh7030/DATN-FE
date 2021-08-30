import axios from "axios";
import {
  WORKSPACES_URL,
  USERS_URL,
  ASC,
  DESC,
  RE_INVITE_URL,
} from "constants/index";
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

export const archiveUserService = (userID) => {
  return axios
    .put(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/isActive/${userID}`,
      null,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const deleteUserService = (id, userID) => {
  return axios
    .delete(
      process.env.REACT_APP_API_URL +
        `${WORKSPACES_URL}/${id}/account/${userID}`,

      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const reInviteUserService = (id, data) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}${RE_INVITE_URL}`,
      data,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
