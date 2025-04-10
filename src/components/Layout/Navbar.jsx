import { AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';

function Navbar({ user, onLogout }) {
  // Safely get first initial
  const firstInitial = user?.name?.charAt(0) || '';
  console.log(`user:`, user);
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        <Avatar sx={{ mx: 2 }}>{firstInitial}</Avatar>
        <Typography variant="subtitle1">
          {user?.name || 'User'} ({user?.accessType || 'employee'})
        </Typography>
        <Button color="inherit" onClick={onLogout} sx={{ ml: 2 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;