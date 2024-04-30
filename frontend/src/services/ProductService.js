import axios from "axios";
import AuthHeader from "./AuthHeader";
import { unstable_useViewTransitionState } from "react-router-dom";

const API_URL = "http://localhost:8080/api/v1/"

class ProductService {

    async getProductsPage(pageNumber, pageSize){
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

    async getProduct(productId) {
        const userToken = AuthHeader().Authorization;
        return axios.get(API_URL + "products/" + productId, {
            headers: {
                Authorization: userToken
            }
        })
    }

    async postProduct(image, name, price, stock) {
        const userToken = AuthHeader().Authorization;
        try {
            const formData = new FormData();
            formData.append('image', image); 
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);
    
            const response = await axios.post(API_URL + "products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    Authorization: userToken
                }  
            });
            return response.data;
        } catch (error) {
            console.error('Error creating product', error);
            throw error;
        }
    }

    async patchProduct(productId, name, price, stock, image) {
        const userToken = AuthHeader().Authorization;
        try{
            return axios.patch(API_URL + "products/" + productId, {
                id: productId,
                image: image,
                name: name,
                price: price,
                stock: stock
            }, {
                headers: {
                    Authorization: userToken
                }  
            });
        }catch(error){
            console.log("Error while updating partially product", error);
        }
    }

    async deleteProduct(productId){
        const userToken = AuthHeader().Authorization;
        try{
            return axios.delete(API_URL + "products/" + productId, {
                headers: {
                    Authorization: userToken
                }
            })
        }catch(error){
            console.log("Error while deleting product", error);
        }
    }
}

export default new ProductService;