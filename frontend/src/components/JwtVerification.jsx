import { useEffect } from "react";
import { componentWithRouter } from "../utils/Router";

const JwtVerification = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const tokenExpiry = user.tokenExp;
      let currentDate = new Date();
      if (tokenExpiry * 1000 < currentDate.getTime()) {
        props.logout();
      }
    }
  }, [location]);

  return <div></div>;
};

export default componentWithRouter(JwtVerification);
