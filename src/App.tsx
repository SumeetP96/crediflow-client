import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { LayoutProvider } from './layouts/LayoutProvider';

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

      <LayoutProvider>
        <Outlet />
      </LayoutProvider>
    </>
  );
}

export default App;
