import axios from "axios";

const baseURL = "https://hr-resource-app.herokuapp.com";

export const loginService = (loginData) => {
  return axios.post(baseURL + "/login", loginData).then((response) => {
    if (response.data.jwt) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

export const logoutService = () => {
  localStorage.removeItem("user");
};
