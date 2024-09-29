import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import AuthProvider from './auth/AuthProvider';
import useNavigateTo from './layouts/hooks/use-navigate-to';

const queryClient = new QueryClient();

function App() {
  const { navigateTo } = useNavigateTo();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigateTo('/dashboard');
    }
  }, [location, navigateTo]);

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
      borderRadius: 12,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
