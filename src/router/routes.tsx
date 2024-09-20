import { AppRoutes, EAppRoutes } from './constants';

export const AppRoute = (
  route: keyof typeof EAppRoutes,
  params?: string | number | Array<string | number>,
): string => {
  const path = AppRoutes[route].path;

  return typeof path === 'function' ? path(params) : path;
};
