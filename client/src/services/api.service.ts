import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

interface ApiErrorResponse {
    message: string;
    status: string;
}

/**
 * Centralized Axios instance
 */
const api: AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Response Interceptor: Centralized Error Handling
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message || 'A network error occurred';
        console.error(`[API Error Interceptor]: ${errorMessage}`);
        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
