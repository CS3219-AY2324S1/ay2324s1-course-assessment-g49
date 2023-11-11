export default function AuthenticationToken() {
  const userToken = JSON.parse(localStorage.getItem("user")); //check

  if (userToken) {
    return { Authorization: "Bearer " + userToken.jwt };
  } else {
    return {};
  }
}
