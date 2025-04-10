import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@mui/material';
import employeeService from '../../services/employeeService';

function EmployeeDashboard({ employeeId }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchEmployee = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeService.getById(employeeId);
      setEmployee(response.data);
    } catch (err) {
      setError('Failed to fetch employee data. Please try again.');
      console.error('Error fetching employee:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]); // Add employeeId as dependency

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]); // Now properly includes all dependencies

  // Memoize formatting functions
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString();
  }, []);

  const formatSalary = useCallback((salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  }, []);

  // Safely get initials for avatar
  const getInitials = useCallback((firstName = '', lastName = '') => {
    return `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`;
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No employee data found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
              {getInitials(employee.firstName, employee.lastName)}
            </Avatar>
            <Typography variant="h5">
              {employee.firstName} {employee.lastName}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItem>
              <ListItemText 
                primary="Employee ID" 
                secondary={employee.employeeId} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Email" 
                secondary={employee.email} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Job Title" 
                secondary={employee.jobTitle} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Division" 
                secondary={employee.division} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Hire Date" 
                secondary={formatDate(employee.hireDate)} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Salary" 
                secondary={formatSalary(employee.salary)} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Admin Status" 
                secondary={employee.isAdmin === 'Yes' ? 'Admin' : 'Employee'} 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EmployeeDashboard;