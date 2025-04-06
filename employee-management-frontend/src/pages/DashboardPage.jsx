import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import authService from '../services/authService';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
    }
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {user.accessType === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard employeeId={user.userId} />
      )}
    </div>
  );
}

export default DashboardPage;