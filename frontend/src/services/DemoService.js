import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/v1/demo';

export const DemoService = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/string`);
        return response.data;
    } catch (error) {
        console.error('Error fetching string value:', error);  
        return '';
    }
};
