import axios from "axios"

const baseUrl = 'http://localhost:5142/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    // timeout: 1000,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export const axiosAuthInstance = axios.create({
    baseURL: baseUrl,
    // timeout: 1000,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // "custom": "agh",
        'Authorization': sessionStorage.getItem('tkn2') as string
    },
});

// Use an interceptor to always attach the latest token
axiosAuthInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('tkn');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const createAuthHeaders = (): { Authorization: string } => {
    const token = sessionStorage.getItem('tkn')
    return {
        Authorization: token as string,
    }
}

export default axiosInstance