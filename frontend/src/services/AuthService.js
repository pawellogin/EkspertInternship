import axios from "axios"
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/v1/auth/"

class AuthService {
    async login(username, password){
        const response = await axios
            .post(API_URL + "login", {
                username,
                password
            });
        if (response.data.token) {
            const { token, username: username_1, authorities } = response.data;
            localStorage.setItem("user", JSON.stringify({ token, username, authorities }));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
        console.log("logout in service");
    }

    register(username, password, firstName, lastName) {
        return axios.post(API_URL + "register", {
            username,
            password,
            firstName,
            lastName
        });
    }

    getCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if(currentUser) {
            return currentUser
        }else {
            return null;
        }
    }

    getCurrentUserRole() {
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.authorities && currentUser.authorities.length > 0) {
            const role = currentUser.authorities[0].authority;
            return role;
        } else {
            console.log("No authorities found for the current user");
            return false;
        }
    }

    getCurrentUserUsername() {
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.username) {
            const username = currentUser.username;
            return username;
        } else {
            console.log("No username found for the current user");
            return false;
        }
    }

    checkIsUserLoggedIn() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if(!currentUser){
          return false;
        }else if(currentUser.token){
            const decodedToken = jwtDecode(currentUser.token);
            const currentDate = new Date();

            if(decodedToken.exp * 1000 < currentDate.getTime()) {
                return false;
            }else{
                return true;
            }
        }else {
          return false;
        }
      }
}

export default new AuthService();