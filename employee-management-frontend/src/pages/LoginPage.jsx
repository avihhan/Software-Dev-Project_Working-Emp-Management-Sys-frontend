import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../services/apiSwitch';

function LoginPage() {
  const [credentials, setCredentials] = useState({ 
    userId: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the credentials state directly
      const response = await api.auth.login({
        userId: credentials.userId,
        password: credentials.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h4" gutterBottom>Employee Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          value={credentials.userId}
          onChange={(e) => setCredentials({
            ...credentials, 
            userId: e.target.value
          })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials, 
            password: e.target.value
          })}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;