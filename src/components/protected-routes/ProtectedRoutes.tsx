import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../../auth/use-auth';
import { LayoutProvider } from '../../layouts/LayoutProvider';
import { AppRoute } from '../../router/helpers';

export default function ProtectedRoutes() {
  const location = useLocation();

  const { authUser, authError } = useAuth();

  if (authUser === undefined) {
    return 'Loading...';
  }

  if (authError) {
    return (
      <Navigate
        to={AppRoute('ERROR', authError.status)}
        replace
        state={{ prevLocation: location }}
      />
    );
  }

  return authUser ? (
    <LayoutProvider>
      <Outlet />
    </LayoutProvider>
  ) : (
    <Navigate to={AppRoute('LOGIN')} replace state={{ prevLocation: location }} />
  );
}
