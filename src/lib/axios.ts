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
        "custom": "agh",
        'Authorization': sessionStorage.getItem('tkn') as string
    },
});

export const createAuthHeaders = (): { Authorization: string } => {
    const token = sessionStorage.getItem('tkn')
    return {
        Authorization: token as string,
    }
}

export default axiosInstance