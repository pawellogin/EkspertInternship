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

    async PostProduct(image, name, price, stock) {
        const userToken = AuthHeader().Authorization;
        try {
            const response = await axios.post(API_URL + "products", {
                image: image,
                name: name,
                price: price,
                stock: stock
            }, {
                headers: {
                    Authorization: userToken
                }  
            });
            return response.data;
        } catch (error) {
            console.error('Error creating product', error);
            throw error;
        }
    }
}

export default new ProductService;