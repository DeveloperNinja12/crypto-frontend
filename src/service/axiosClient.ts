import axios from 'axios';
import { BASE_URL } from '../utils/constant';

let token: null = null;
export const setToken = (authToken: null) => {
    token = authToken;
};
const client = axios.create({});
client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorResponse = error.response;
        if (errorResponse) {
            const message = errorResponse.data?.message || "Something went wrong. Please try again.";
            return Promise.reject({ message, status: errorResponse.status });
        }
        return Promise.reject({ message: "Network error", status: 500 });
    }
);

export const axiosClient = (
    endpoint: string,
    payload = {},
    method = 'get',
    headers = {
        Authorization: token,
    }
) => {
    let axiosConfig = {
        method: method.toLowerCase(),
    };
    if (endpoint !== 'login') {
        //@ts-ignore
        axiosConfig.headers = headers;
    }
    if (method === 'get') {
        //@ts-ignore
        axiosConfig.params = payload;
    } else {
        //@ts-ignore
        axiosConfig.data = payload;
    }
    return client(`${BASE_URL}${endpoint}`, axiosConfig);
};