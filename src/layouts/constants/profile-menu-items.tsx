import { Logout, Person, Settings } from '@mui/icons-material';
import { ReactNode } from 'react';
import { AppRoute } from '../../router/helpers';

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
    to: AppRoute('PROFILE'),
  },
  {
    id: 'settings',
    icon: <Settings />,
    label: 'Settings',
    to: AppRoute('SETTINGS'),
  },
  {
    id: 'logout',
    hasDivider: true,
    icon: <Logout />,
    label: 'Logout',
  },
];
