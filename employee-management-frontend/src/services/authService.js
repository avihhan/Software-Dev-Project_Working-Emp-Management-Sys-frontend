import api from '../api/axios';

const authService = {
  /**
   * Authenticates a user with the backend
   * @param {Object} credentials - { empid: string, password: string }
   * @returns {Promise} Axios response with employee data
   */
  login: async ({ empid, password }) => {
    const response = await api.post('/employees/login', null, {
      params: { empid, password }
    });
    
    // Preserve original isAdmin format
    return {
      ...response.data,
      token: 'session-token'
      // Don't transform isAdmin here
    };
  },

  /**
   * Clears authentication data
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  },

  /**
   * Stores user session data
   */
  storeSession: (userData) => {
    const user = {
      token: 'session-token',
      userId: userData.employeeId,
      name: `${userData.firstName} ${userData.lastName}`,
      // Check against original string value
      accessType: userData.isAdmin === 'Yes' ? 'admin' : 'employee'
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export default authService;