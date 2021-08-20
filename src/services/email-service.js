import axios from "axios";
import { EMAILS_URL, WORKSPACES_URL } from "constants/index";
import authHeader from "./data-service";

export const getEmailsService = (id) => {
  return axios
    .get(
      process.env.REACT_APP_API_URL + `${WORKSPACES_URL}/${id}${EMAILS_URL}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response.data;
    });
};
