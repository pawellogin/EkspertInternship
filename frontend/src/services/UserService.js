import axios from "axios"
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/v1/"

class UserService {

  getUsersPage(pageNumber, pageSize) {
    const userToken = AuthHeader().Authorization;
    return axios.get(API_URL + "users", {
      headers: {
        Authorization: userToken
      },
      params: {
        page: pageNumber,
        size: pageSize
      }
    });
  }

  getUser(userId) {
    const userToken = AuthHeader().Authorization;
    return axios.get(API_URL + "users/" + userId, {
      headers: {
        Authorization: userToken
      }
    })
    }
}

export default new UserService();

