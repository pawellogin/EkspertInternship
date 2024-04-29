import React from 'react'
import AuthHeader from "./AuthHeader";
import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/";

class CartService {

    async getCartList() {
        const userToken = AuthHeader().Authorization;
        return axios.get(API_URL + "carts", {
            headers: {
                Authorization: userToken
            }
        });
    }

    async getCart(cartId) {
        const userToken = AuthHeader().Authorization;
        return axios.get(API_URL + "carts/" + cartId, {
            headers: {
                Authorization: userToken
            }
        });
    }
}

export default new CartService