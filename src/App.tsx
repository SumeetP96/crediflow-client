import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
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

  const theme = createTheme({
    colorSchemes: {
      dark: true,
      light: {
        palette: {
          background: {
            default: blueGrey[50],
          },
        },
      },
    },
    shape: {
      borderRadius: 16,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <LayoutProvider>
          <Outlet />
        </LayoutProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
