// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = '${process.env.REACT_APP_BACKEND_URL}/api/orders/orders'; // Update with your backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
