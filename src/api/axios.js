import axios from 'axios';

const api = axios.create({
  baseURL: 'https://springboot-app-2gl0.onrender.com/api',  //set the backend url here
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;