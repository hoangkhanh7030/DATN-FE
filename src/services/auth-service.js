import axios from "axios";
import { LOGIN_URL, USER } from "constants/index";

export const loginService = (loginData) => {
  return axios
    .post(process.env.REACT_APP_API_URL + LOGIN_URL, loginData)
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem(USER, JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const loginWithGGService = (googleData) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "/auth/google", googleData)
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logoutService = () => {
  localStorage.removeItem(USER);
};
