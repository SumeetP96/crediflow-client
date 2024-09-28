import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../../auth/use-auth';
import { AppRoute } from '../../router/helpers';

export default function ProtectedRoutes() {
  const location = useLocation();

  const { authUser } = useAuth();
  console.log('🚀 ~ ProtectedRoutes ~ authUser:', authUser);

  if (authUser === undefined) {
    return 'Loading...';
  }

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute('LOGIN')} replace state={{ from: location.pathname }} />
  );
}
