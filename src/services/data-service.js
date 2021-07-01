export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return { Authorization: user.jwt, AccountId: user.accountDTO.id };
  } else {
    return {};
  }
}
