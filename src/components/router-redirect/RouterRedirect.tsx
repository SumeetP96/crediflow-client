import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

function RouterRedirect({ from, to }: { from?: string; to?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (from && to && from === location.pathname) {
      navigate(to);
    }
  }, [from, location.pathname, navigate, to]);
  return <Outlet />;
}

export default RouterRedirect;
