import api from '../api/axios';

const employeeService = {
  getAll: (page, size) => api.get(`/employees?page=${page}&size=${size}`),
  search: (query) => api.get(`/employees/search?query=${query}`),
  getById: (id) => api.get(`/employees/${id}`),
  update: (id, data) => api.put(`/employees/${id}`, data),
  updateSalary: (id, salaryData) => api.patch(`/employees/${id}/salary`, salaryData),
  delete: (id) => api.delete(`/employees/${id}`),
};

export default employeeService;