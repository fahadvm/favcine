import axios from 'axios';

/**
 * Centralized Axios instance
 * Configured with base URL and common headers.
 * Interceptors handle global behaviors like error logging.
 */
const api = axios.create({
    baseURL: '/api', // Proxied via Vite to http://localhost:5000
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10s timeout
});

// Response Interceptor: Centralized Error Handling
api.interceptors.response.use(
    (response) => {
        // Return only the data to simplify component logic
        return response.data;
    },
    (error) => {
        // Extract meaningful error messages from backend ApiError responses
        const errorMessage = error.response?.data?.message || 'A network error occurred';

        // You could trigger global UI notifications (toasts) here
        console.error(`[API Error Interceptor]: ${errorMessage}`);

        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
