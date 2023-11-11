import axios from "axios"; 

const databaseURL = import.meta.env.VITE_DATABASE_URL;
const API_URL = `${databaseURL}/auth/`;

class AuthenticationService {
    register() {

    }

    async login(user) {
        await axios.post(API_URL + `login`, user).then((res) => {
            console.log(res.data.jwt);
            const token = res.data.jwt;
            const decodedToken = jwtDecode(token);
            const userID = decodedToken.sub;
            const userRole = decodedToken.role;
            const userData = {jwt: token, userId: userID, userRole: userRole}
            console.log(userData)
            if (res.data.jwt) {
              localStorage.setItem("user", JSON.stringify(userData));
            }
          });
    }

    logout() {

    }
}

export default new AuthenticationService();