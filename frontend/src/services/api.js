import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Her istekte JWT token ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 gelirse logout yap
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
};

export const questionAPI = {
  getAll: (params) => api.get('/questions', { params }),
  getOne: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post('/questions', data),
  delete: (id) => api.delete(`/questions/${id}`),
  addAnswer: (id, data) => api.post(`/questions/${id}/answers`, data),
  acceptAnswer: (qId, aId) => api.put(`/questions/${qId}/answers/${aId}/accept`),
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAllRead: () => api.put('/notifications/read-all'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  toggleUser: (id) => api.put(`/admin/users/${id}/toggle`),
  featureQuestion: (id) => api.put(`/admin/questions/${id}/feature`),
  broadcast: (data) => api.post('/admin/broadcast', data),
};

export default api;
