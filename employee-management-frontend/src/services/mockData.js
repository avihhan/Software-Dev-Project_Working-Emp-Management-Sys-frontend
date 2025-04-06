// Generate mock employees
const generateEmployees = () => {
    const employees = [];
    const positions = ['Developer', 'Manager', 'HR', 'Designer'];
    const accessTypes = ['admin', 'employee'];
    
    for (let i = 1; i <= 50; i++) {
      employees.push({
        id: i,
        firstName: `Employee${i}`,
        lastName: `Last${i}`,
        email: `employee${i}@company.com`,
        position: positions[Math.floor(Math.random() * positions.length)],
        salary: Math.floor(Math.random() * 9000) + 3000,
        department: `Dept${Math.floor(Math.random() * 5) + 1}`,
        joinDate: new Date(2020 + Math.floor(Math.random() * 3), 
                           Math.floor(Math.random() * 12), 
                           Math.floor(Math.random() * 28)).toISOString(),
        accessType: i === 1 ? 'admin' : 'employee' // First employee is admin
      });
    }
    return employees;
  };
  
  const mockEmployees = generateEmployees();
  
  // Mock authentication
  const mockUsers = [
    {
      userId: "admin",
      password: "admin123",
      name: "Admin User",
      accessType: "admin",
      token: "mock-admin-token"
    },
    {
      userId: "employee1",
      password: "emp123",
      name: "John Doe",
      accessType: "employee",
      token: "mock-employee-token"
    }
  ];
  
  export const mockAuthService = {
    login: (credentials) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find(u => 
            u.userId === credentials.userId && 
            u.password === credentials.password
          );
          if (user) {
            resolve({ data: { 
              token: user.token, 
              user: {
                userId: user.userId,
                name: user.name,
                accessType: user.accessType
              }
            }});
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 500); // Simulate network delay
      });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };
  
  export const mockEmployeeService = {
    getAll: (page = 0, size = 10) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = page * size;
          const end = start + size;
          resolve({
            data: {
              content: mockEmployees.slice(start, end),
              totalElements: mockEmployees.length,
              totalPages: Math.ceil(mockEmployees.length / size)
            }
          });
        }, 500);
      });
    },
    search: (query) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const results = mockEmployees.filter(emp => 
            emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
            emp.email.toLowerCase().includes(query.toLowerCase()) ||
            emp.id.toString().includes(query)
          );
          resolve({ data: results });
        }, 500);
      });
    },
    getById: (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: mockEmployees.find(emp => emp.id === parseInt(id)) });
        }, 500);
      });
    },
    update: (id, data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
          if (index !== -1) {
            mockEmployees[index] = { ...mockEmployees[index], ...data };
          }
          resolve({ data: mockEmployees[index] });
        }, 500);
      });
    },
    updateSalary: (id, salaryData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
          if (index !== -1) {
            mockEmployees[index].salary = salaryData.salary;
          }
          resolve({ data: mockEmployees[index] });
        }, 500);
      });
    },
    delete: (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockEmployees.findIndex(emp => emp.id === parseInt(id));
          if (index !== -1) {
            mockEmployees.splice(index, 1);
          }
          resolve({ data: {} });
        }, 500);
      });
    }
  };