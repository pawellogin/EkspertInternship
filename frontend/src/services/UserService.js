import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/"

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'users');
    }

    getAllUsers() {
      return axios.get(API_URL + 'users');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
      }
    
    getAdminBoard() {
      return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();

