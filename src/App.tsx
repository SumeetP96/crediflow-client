import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import SideNavAppBarLayout from './layouts/side-nav-app-bar-layout/SideNavAppBarLayout';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location, navigate]);

  return (
    <>
      <CssBaseline />

      <SideNavAppBarLayout>
        <Outlet />
      </SideNavAppBarLayout>
    </>
  );
}

export default App;
