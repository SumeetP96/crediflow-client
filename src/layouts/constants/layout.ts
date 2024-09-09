import {
  SideNavLayoutContext,
  SideNavLayoutProvider,
} from '../side-nav-layout/SideNavLayoutProvider';

export enum Layouts {
  SIDE_NAV = 'side-nav',
}

export const defaultLayout = Layouts.SIDE_NAV;

export const layoutContextProviders = {
  [Layouts.SIDE_NAV]: {
    context: SideNavLayoutContext,
    provider: SideNavLayoutProvider,
  },
};
