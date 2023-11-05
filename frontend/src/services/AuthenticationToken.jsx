export default function AuthenticationToken() {
    const userToken = JSON.parse(localStorage.getItem('user')); //check 
    console.log(userToken)

    if (userToken) {
        return { Authorization: 'Bearer ' + userToken.jwt };
    } else {
        return {};
    }
}