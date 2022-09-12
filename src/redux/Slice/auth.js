import history from "src/hisotry"
// import setConte
import jwt_decode from "jwt-decode";
export const authLink = () => {
    let token = localStorage.getItem('JWT_Token')
    const { exp } = jwt_decode(token)
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
        localStorage.clear();
        history.push('/login');
    }
    return {
        // you can set your headers directly here based on the old token
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
    }
}