import axios from 'axios';

/**
 * Axios instance configured with the base URL from environment variables.
 * All API calls should use this instance for consistent configuration.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Request interceptor - attach auth token if available.  
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('modalin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handle common errors globally.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('modalin_token');
      sessionStorage.removeItem('modalin_estimated_assets');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
