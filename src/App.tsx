import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { LayoutProvider } from './layouts/LayoutProvider';

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </LayoutProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
