import { mockAuthService, mockEmployeeService } from './mockData';
import authService from './authService';
import employeeService from './employeeService';

const USE_MOCK_DATA = true; // Set to false when connecting to real backend

export default {
  auth: USE_MOCK_DATA ? mockAuthService : authService,
  employee: USE_MOCK_DATA ? mockEmployeeService : employeeService
};