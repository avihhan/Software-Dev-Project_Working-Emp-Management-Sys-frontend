import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeModal from './EmployeeModal';
import employeeService from '../../services/employeeService';

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const fetchTimeoutRef = useRef(null);

  // Memoized fallback function
  const sequentialFetchFallback = useCallback(async () => {
    const timeout = setTimeout(() => {
      setError('Request timeout - server not responding');
      setLoading(false);
    }, 10000);

    fetchTimeoutRef.current = timeout;

    let currentId = 0;
    const fetchedEmployees = [];
    const maxAttempts = 20;
    let consecutiveFailures = 0;

    while (consecutiveFailures < 3 && currentId < maxAttempts) {
      try {
        const response = await employeeService.getById(currentId);
        fetchedEmployees.push(response.data);
        currentId++;
        consecutiveFailures = 0;
      } catch (error) {
        consecutiveFailures++;
        if (error.response?.status === 404) break;
        console.error(`Error fetching employee ${currentId}:`, error);
        currentId++;
      }
    }

    setEmployees(fetchedEmployees);
    clearTimeout(fetchTimeoutRef.current);
  }, []);

  // Main fetch function
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try bulk search first
      try {
        const response = await employeeService.searchByParam('all', '');
        setEmployees(response.data || []);
        return;
      } catch (searchError) {
        console.log('Bulk search failed, falling back to sequential:', searchError);
      }

      // Fallback to sequential
      await sequentialFetchFallback();
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
      console.error('Error fetching employees:', err);
    } finally {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setLoading(false);
    }
  }, [sequentialFetchFallback]); // Now includes all dependencies

  useEffect(() => {
    fetchEmployees();
    
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [fetchEmployees]); // Now includes all dependencies

  // ... (keep your existing handler functions unchanged) ...
  const handleUpdateEmployee = async (updatedData) => {
    try {
      await employeeService.updateById(
        updatedData.employeeId,
        Object.keys(updatedData)[0],
        Object.values(updatedData)[0]
      );
      fetchEmployees();
      return { success: true };
    } catch (error) {
      console.error('Update failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  const handleDeleteEmployee = async (employeeId) => {
    try {
      await employeeService.updateById(employeeId, 'status', 'inactive');
      fetchEmployees();
      return { success: true };
    } catch (error) {
      console.error('Delete failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  const handleUpdateSalary = async (employeeId, percentageIncrease) => {
    try {
      await employeeService.updateSalary(employeeId, percentageIncrease);
      fetchEmployees();
      return { success: true };
    } catch (error) {
      console.error('Salary update failed:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Button onClick={fetchEmployees} sx={{ ml: 2 }}>Retry</Button>
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading employees...</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">
              Total Employees: {employees.length}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={fetchEmployees}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
          
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <ListItem 
                  key={employee.employeeId}
                  secondaryAction={
                    <>
                      <IconButton 
                        edge="end" 
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleDeleteEmployee(employee.employeeId)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`${employee.firstName} ${employee.lastName}`}
                    secondary={
                      <>
                        <div>ID: {employee.employeeId}</div>
                        <div>Email: {employee.email}</div>
                        <div>Salary: ${employee.salary?.toLocaleString()}</div>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No employees found" />
              </ListItem>
            )}
          </List>
          
          {selectedEmployee && (
            <EmployeeModal 
              employee={selectedEmployee}
              onClose={() => setSelectedEmployee(null)}
              onUpdate={handleUpdateEmployee}
              onDelete={handleDeleteEmployee}
              onSalaryUpdate={handleUpdateSalary}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default AdminDashboard;



