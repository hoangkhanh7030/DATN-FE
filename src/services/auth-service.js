import axios from "axios";
import { LOGIN_URL } from "constants/index";

export const loginService = (loginData) => {
  return axios
    .post(process.env.REACT_APP_API_URL + LOGIN_URL, loginData)
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logoutService = () => {
  localStorage.removeItem("user");
};
