import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import AuthProvider from './auth/AuthProvider';
import NotistackSnackbarProvider from './components/notistack-snackbar-provider/NotistackSnackbarProvider';
import ThemeProviderWrapper from './components/theme-provider-wrapper/ThemeProviderWrapper';
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

  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotistackSnackbarProvider>
              <Outlet />
            </NotistackSnackbarProvider>
          </AuthProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
