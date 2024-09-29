import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../../auth/use-auth';
import { LayoutProvider } from '../../layouts/LayoutProvider';
import { AppRoute } from '../../router/helpers';

export default function ProtectedRoutes() {
  const location = useLocation();

  const { authUser } = useAuth();

  if (authUser === undefined) {
    return 'Loading...';
  }

  return authUser ? (
    <LayoutProvider>
      <Outlet />
    </LayoutProvider>
  ) : (
    <Navigate to={AppRoute('LOGIN')} replace state={{ from: location.pathname }} />
  );
}
