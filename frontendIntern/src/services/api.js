import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register/', data),
  login: (credentials) => apiClient.post('/auth/login/', credentials),
  logout: () => apiClient.post('/auth/logout/'),
  getProfile: () => apiClient.get('/auth/profile/'),
  updateProfile: (data) => apiClient.put('/auth/profile/update/', data),
};

// Products API
export const productsAPI = {
  getAll: (params) => apiClient.get('/products/', { params }),
  getById: (id) => apiClient.get(`/products/${id}/`),
  create: (data) => apiClient.post('/products/', data),
  update: (id, data) => apiClient.put(`/products/${id}/`, data),
  delete: (id) => apiClient.delete(`/products/${id}/`),
  getFeatured: () => apiClient.get('/products/featured/'),
  search: (params) => apiClient.get('/products/search/', { params }),
  getReviews: (id) => apiClient.get(`/products/${id}/reviews/`),
  addReview: (id, data) => apiClient.post(`/products/${id}/add_review/`, data),
};

// Categories API
export const categoriesAPI = {
  getAll: (params) => apiClient.get('/categories/', { params }),
  getById: (id) => apiClient.get(`/categories/${id}/`),
  create: (data) => apiClient.post('/categories/', data),
  update: (id, data) => apiClient.put(`/categories/${id}/`, data),
  delete: (id) => apiClient.delete(`/categories/${id}/`),
};

// Cart API
export const cartAPI = {
  getCart: () => apiClient.get('/cart/my_cart/'),
  addItem: (data) => apiClient.post('/cart/add_item/', data),
  removeItem: (data) => apiClient.post('/cart/remove_item/', data),
  updateItem: (data) => apiClient.post('/cart/update_item/', data),
  clear: () => apiClient.delete('/cart/clear/'),
};

// Orders API
export const ordersAPI = {
  getAll: (params) => apiClient.get('/orders/', { params }),
  getById: (id) => apiClient.get(`/orders/${id}/`),
  createFromCart: () => apiClient.post('/orders/create_from_cart/'),
  updateStatus: (id, data) => apiClient.post(`/orders/${id}/update_status/`, data),
};

// Reviews API
export const reviewsAPI = {
  getAll: (params) => apiClient.get('/reviews/', { params }),
  getById: (id) => apiClient.get(`/reviews/${id}/`),
  create: (data) => apiClient.post('/reviews/', data),
  update: (id, data) => apiClient.put(`/reviews/${id}/`, data),
  delete: (id) => apiClient.delete(`/reviews/${id}/`),
};

export default apiClient;
