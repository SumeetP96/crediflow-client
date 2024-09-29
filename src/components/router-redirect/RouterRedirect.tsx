import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';

function RouterRedirect({ from, to }: { from?: string; to?: string }) {
  const { navigateTo } = useNavigateTo();

  const location = useLocation();

  useEffect(() => {
    if (from && to && from === location.pathname) {
      navigateTo(to);
    }
  }, [from, location.pathname, navigateTo, to]);

  return <Outlet />;
}

export default RouterRedirect;
