import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import authService from '../services/authService';
import UnderWork from './UnderConstruction';

function DashboardPage() {

  const [websiteWorking, setWebsiteWorking] = useState(false);

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
      {
        websiteWorking ?
          <>
            <Navbar user={user} onLogout={handleLogout} />
            {user.accessType === 'admin' ? (
              <AdminDashboard />
            ) : (
              <EmployeeDashboard employeeId={user.userId} />
            )}
          </>
          :
          <>
            <UnderWork />
          </>
      }
    </div>
  );
}

export default DashboardPage;