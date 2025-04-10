import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Added import
import Navbar from '../components/Layout/Navbar';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import authService from '../services/authService';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(storedUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div>
      <Navbar 
        user={{
          name: user.name,
          userId: user.userId,
          accessType: user.accessType
        }} 
        onLogout={handleLogout} 
      />
      
      {user.accessType === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard employeeId={user.userId} />
      )}
    </div>
  );
}

export default DashboardPage;