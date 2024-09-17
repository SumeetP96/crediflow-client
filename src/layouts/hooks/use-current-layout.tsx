import { Layouts, defaultLayout, layoutContextProviders } from '../constants/layout';

export const useCurrentLayout = () => {
  const lsLayoutKey = (localStorage.getItem('layout') as Layouts) || undefined;

  const layoutKey =
    lsLayoutKey && Object.values(Layouts).includes(lsLayoutKey) ? lsLayoutKey : defaultLayout;

  localStorage.setItem('layout', layoutKey);

  return layoutContextProviders[layoutKey];
};
