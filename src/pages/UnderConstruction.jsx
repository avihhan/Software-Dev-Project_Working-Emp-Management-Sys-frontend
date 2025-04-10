// src/components/UnderWork.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material'; // Using Material-UI for styling
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderWork = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Page Under Construction
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        We're working hard to bring you this feature soon. Please check back later!
      </Typography>
      
      <CircularProgress sx={{ mb: 3 }} />
      
      <Button 
        variant="contained" 
        component={Link} 
        to="/" 
        sx={{ mt: 2 }}
      >
        Return
      </Button>
    </Box>
  );
};

export default UnderWork;