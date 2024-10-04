import { ELayouts, defaultLayout, layoutContextProviders } from '../constants/layout';

export const useCurrentLayout = () => {
  const lsLayoutKey = (localStorage.getItem('layout') as ELayouts) || undefined;

  const layoutKey =
    lsLayoutKey && Object.values(ELayouts).includes(lsLayoutKey) ? lsLayoutKey : defaultLayout;

  localStorage.setItem('layout', layoutKey);

  return layoutContextProviders[layoutKey];
};
