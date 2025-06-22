// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050', // replace with your API base URL
  headers: {
    'Content-Type': 'application/json',  // default content type
    Accept: 'application/json',          // default accept header
  },
});

// Automatically attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
