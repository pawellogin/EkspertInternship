import axios from "axios";
import AuthHeader from "./AuthHeader";
import { unstable_useViewTransitionState } from "react-router-dom";

const API_URL = "http://localhost:8080/api/v1/"

class ProductService {

    async GetProductsPage(pageNumber, pageSize){
        const userToken = AuthHeader().Authorization;
        return axios.get(API_URL + "products", {
            headers: {
                Authorization: userToken
            }
            ,
            params: {
                page: pageNumber,
                size: pageSize
            }
        });
    }
}

export default new ProductService;