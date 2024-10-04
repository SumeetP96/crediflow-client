import {
  SideNavLayoutContext,
  SideNavLayoutProvider,
} from '../side-nav-layout/SideNavLayoutProvider';

export enum ELayouts {
  SIDE_NAV = 'side-nav',
}

export const defaultLayout = ELayouts.SIDE_NAV;

export const layoutContextProviders = {
  [ELayouts.SIDE_NAV]: {
    context: SideNavLayoutContext,
    provider: SideNavLayoutProvider,
  },
};
