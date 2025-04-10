import api from '../api/axios';

const employeeService = {
  getById: (empid) => api.get(`employees/details/${empid}`),
  searchByParam: (searchBy, searchVal) => api.get(`/employees/search?searchBy=${searchBy}&searchVal=${searchVal}`),
  updateById: (empid, coloumnToUpdate, newValue) => api.put(`/employees/update?empid=${empid}&columnToUpdate=${coloumnToUpdate}&newValue=${newValue}`),
  updateSalary: (empid, percentageIncrease) => api.put(`/employees/update-salary?empid=${empid}&percentageIncrease=${percentageIncrease}`),
};

export default employeeService;