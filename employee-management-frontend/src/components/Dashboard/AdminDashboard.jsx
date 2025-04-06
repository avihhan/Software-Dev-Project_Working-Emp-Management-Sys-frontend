import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import EmployeeTable from './EmployeeTable';
import SearchBar from './SearchBar';
import EmployeeModal from './EmployeeModal';
import api from '../../services/apiSwitch';

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      fetchEmployees();
    } else {
      handleSearch(searchQuery);
    }
  }, [page, rowsPerPage, searchQuery]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.employee.getAll(page, rowsPerPage);
      setEmployees(response.data.content);
      setTotalEmployees(response.data.totalElements);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      if (query.trim() === '') {
        fetchEmployees();
        return;
      }
      
      const response = await api.employee.search(query);
      setEmployees(response.data);
      setTotalEmployees(response.data.length);
      setPage(0); // Reset to first page when searching
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeUpdated = () => {
    if (searchQuery.trim() === '') {
      fetchEmployees();
    } else {
      handleSearch(searchQuery);
    }
    setSelectedEmployee(null);
  };

  const handleEmployeeDeleted = () => {
    if (employees.length === 1 && page > 0) {
      setPage(page - 1);
    } else {
      if (searchQuery.trim() === '') {
        fetchEmployees();
      } else {
        handleSearch(searchQuery);
      }
    }
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
      
      <SearchBar 
        onSearch={(query) => {
          setSearchQuery(query);
          setPage(0); // Reset to first page when new search is initiated
        }} 
        disabled={loading}
      />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <EmployeeTable 
            employees={employees}
            page={page}
            rowsPerPage={rowsPerPage}
            totalEmployees={totalEmployees}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setPage(0); // Reset to first page when page size changes
            }}
            onSelectEmployee={setSelectedEmployee}
            loading={loading}
          />
          
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