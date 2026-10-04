import axios from 'axios';

// Always default to the Render deployed API
const DEFAULT_URL = import.meta.env.VITE_API_URL || 'https://espino-jose-lavalust-api.onrender.com/api';

export const getBaseApiUrl = () => {
  return localStorage.getItem('lavalust_api_url') || DEFAULT_URL;
};

export const setBaseApiUrl = (url) => {
  const cleanUrl = url.trim().replace(/\/+$/, '');
  localStorage.setItem('lavalust_api_url', cleanUrl);
  apiClient.defaults.baseURL = cleanUrl;
  return cleanUrl;
};

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: getBaseApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    config.baseURL = getBaseApiUrl();
    const token = localStorage.getItem('lavalust_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('lavalust_jwt_token');
      localStorage.removeItem('lavalust_user');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const apiService = {
  // Authentication
  login: async (username, password) => {
    const res = await apiClient.post('/login', { username, password });
    return res.data;
  },

  logout: async () => {
    try {
      await apiClient.post('/logout');
    } finally {
      localStorage.removeItem('lavalust_jwt_token');
      localStorage.removeItem('lavalust_user');
    }
  },

  getMe: async () => {
    const res = await apiClient.get('/me');
    return res.data;
  },

  // Products CRUD
  getProducts: async () => {
    const res = await apiClient.get('/products');
    return res.data;
  },

  getProduct: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (productData) => {
    const res = await apiClient.post('/products', productData);
    return res.data;
  },

  updateProduct: async (id, productData) => {
    try {
      const res = await apiClient.put(`/products/${id}`, productData);
      return res.data;
    } catch (err) {
      // If PUT is blocked by server proxy, fallback to POST update endpoint
      if (err.response && (err.response.status === 405 || err.response.status === 404)) {
        const fallbackRes = await apiClient.post(`/products/update/${id}`, productData);
        return fallbackRes.data;
      }
      throw err;
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await apiClient.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      // If DELETE is blocked by server proxy, fallback to POST delete endpoint
      if (err.response && (err.response.status === 405 || err.response.status === 404)) {
        const fallbackRes = await apiClient.post(`/products/delete/${id}`);
        return fallbackRes.data;
      }
      throw err;
    }
  },
};
