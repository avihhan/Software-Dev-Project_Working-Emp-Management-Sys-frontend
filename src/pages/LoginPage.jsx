import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import authService from '../services/authService';

function LoginPage() {
  const [credentials, setCredentials] = useState({ 
    empid: '',
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await authService.login(credentials);
      authService.storeSession(userData);
      
      // Always redirect to /dashboard, regardless of isAdmin
      navigate('/dashboard'); // Removed the ternary operator
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h4" gutterBottom>Employee Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Employee ID"
          value={credentials.empid}
          onChange={(e) => setCredentials({...credentials, empid: e.target.value})}
          required
          autoFocus
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Authenticating...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;