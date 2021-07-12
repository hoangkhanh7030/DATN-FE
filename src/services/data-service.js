import {USER} from "constants/index";

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(USER));

  if (user && user.jwt) {
    return { Authorization: user.jwt, AccountId: user.accountDTO.id };
  } else {
    return {};
  }
}
