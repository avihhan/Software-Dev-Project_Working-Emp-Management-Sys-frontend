import api from '../api/axios';

const authService = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;