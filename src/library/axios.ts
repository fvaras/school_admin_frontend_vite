import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5142/',
    // timeout: 1000,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export default axiosInstance