import React from 'react'
import AuthHeader from "./AuthHeader";
import axios from 'axios';
import { user } from '@nextui-org/react';

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

    async postCart(productId, productAmount) {
        const userToken = AuthHeader().Authorization;
        return axios.post(API_URL + "carts" ,{
            userId: null,
            productId: productId,
            productAmount:productAmount
        }, {
            headers: {
                Authorization: userToken
            }
        });
    }

    async deleteCart(cartId) {
        const userToken = AuthHeader().Authorization;
        return axios.delete(API_URL + "carts/" + cartId, {
            headers: {
                Authorization: userToken
            }
        });
    }
}

export default new CartService