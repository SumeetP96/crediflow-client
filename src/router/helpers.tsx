import { AppRoutesForBreadcrumbs, EAppRoutes } from './routes';

export const AppRoute = (
  route: keyof typeof EAppRoutes,
  params?: string | number | Array<string | number>,
): string => {
  const path = AppRoutesForBreadcrumbs[route].path;

  return typeof path === 'function' ? path(params) : path;
};
