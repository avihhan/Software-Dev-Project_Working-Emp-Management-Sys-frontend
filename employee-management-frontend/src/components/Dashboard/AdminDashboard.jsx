import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, List, ListItem, ListItemText } from '@mui/material';
import EmployeeModal from './EmployeeModal';
import api from '../../services/apiSwitch';

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.employee.getAll(0, 10); // Fixed pagination for simplicity
      setEmployees(response.data.content);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeUpdated = () => {
    fetchEmployees();
    setSelectedEmployee(null);
  };

  const handleEmployeeDeleted = () => {
    fetchEmployees();
    setSelectedEmployee(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {employees.map((employee) => (
              <ListItem 
                key={employee.id}
                secondaryAction={
                  <Button 
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    Edit
                  </Button>
                }
              >
                <ListItemText
                  primary={employee.name}
                  secondary={employee.email}
                />
              </ListItem>
            ))}
          </List>
          
          {selectedEmployee && (
            <EmployeeModal 
              employee={selectedEmployee}
              onClose={() => setSelectedEmployee(null)}
              onUpdate={handleEmployeeUpdated}
              onDelete={handleEmployeeDeleted}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default AdminDashboard;