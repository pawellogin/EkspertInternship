import axios from "axios"

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
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentUserRole() {
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.authorities && currentUser.authorities.length > 0) {
            const role = currentUser.authorities[0].authority;
            return role;
        } else {
            console.log("No authorities found for the current user.");
            return null;
        }
    }
}

export default new AuthService();