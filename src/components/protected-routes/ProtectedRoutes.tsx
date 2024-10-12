import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../../auth/use-auth';
import { LayoutProvider } from '../../layouts/LayoutProvider';
import { AppRoute } from '../../router/helpers';
import LoaderFullscreen from '../loader-fullscreen/LoaderFullscreen';

export default function ProtectedRoutes() {
  const location = useLocation();

  const { authUser } = useAuth();

  if (authUser === undefined) {
    return <LoaderFullscreen />;
  }

  if (!authUser) {
    return <Navigate to={AppRoute('LOGIN')} replace state={{ prevLocation: location }} />;
  }

  return (
    <LayoutProvider>
      <Outlet />
    </LayoutProvider>
  );
}
