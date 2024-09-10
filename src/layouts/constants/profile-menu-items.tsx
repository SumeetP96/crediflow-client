import { Logout, Person, Settings } from '@mui/icons-material';
import { ReactNode } from 'react';
import { AppRoutes } from '../../router/routes';

export interface IProfileMenuItem {
  id: string;
  icon: ReactNode;
  label: string;
  to?: string;
  hasDivider?: boolean;
}

export const profileMenuItems = [
  {
    id: 'my-profile',
    icon: <Person />,
    label: 'My Profile',
    to: AppRoutes.PROFILE,
  },
  {
    id: 'settings',
    icon: <Settings />,
    label: 'Settings',
    to: AppRoutes.SETTINGS,
  },
  {
    id: 'logout',
    hasDivider: true,
    icon: <Logout />,
    label: 'Logout',
  },
];
