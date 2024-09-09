import { Logout, Person, Settings } from '@mui/icons-material';

export const profileMenuItems = [
  {
    icon: <Person />,
    label: 'My Profile',
  },
  {
    icon: <Settings />,
    label: 'Settings',
  },
  {
    hasDivider: true,
    icon: <Logout />,
    label: 'Logout',
  },
];
