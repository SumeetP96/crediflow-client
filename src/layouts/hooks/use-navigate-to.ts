import { NavigateOptions, To, useLocation, useNavigate } from 'react-router';
import { AppRoute } from '../../router/helpers';
import { EAppRoutes } from '../../router/routes';

export default function useNavigateTo(fallbackPrevRoute?: EAppRoutes | To) {
  const location = useLocation();

  const prevLocation = location.state?.prevLocation;

  let prevRoute = (fallbackPrevRoute || -1) as To;

  if (prevLocation && prevLocation.pathname !== AppRoute('LOGIN')) {
    prevRoute = `${prevLocation.pathname}${prevLocation.search}`;
  }

  const navigate = useNavigate();

  const navigateTo = (to: To, options?: NavigateOptions) => {
    const { state = {}, ...rest } = options || {};

    navigate(to, {
      ...rest,
      state: { prevLocation: location, ...state },
    });
  };

  const navigateToPrev = (overrideRoute?: EAppRoutes | To) => {
    navigateTo(overrideRoute ? overrideRoute : prevRoute);
  };

  return { prevRoute, navigateTo, navigateToPrev };
}
