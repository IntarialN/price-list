import axios, { AxiosRequestConfig } from 'axios';
import UserLocalStorage from "@/modules/user/services/user.localStorage";

type Methods = 'get' | 'post' | 'patch' | 'delete';

export const apiService = async (method: Methods, url: string, body: object = {}) => {
    const token = UserLocalStorage.checkAuthLocalStorage();

    const config: AxiosRequestConfig = {
        method,
        url: `http://localhost:3000/${url}`,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };

    if (method === 'get') {
        config.params = body;
    } else {
        config.data = body;
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        return error;
    }
};