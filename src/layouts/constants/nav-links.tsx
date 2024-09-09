import {
  AccountBalance,
  Dashboard,
  DataUsage,
  Groups,
  People,
  Receipt,
} from '@mui/icons-material';
import { ReactNode } from 'react';

interface INavLinks {
  label: string;
  to: string;
  icon: ReactNode;
}

export const navLinks: INavLinks[] = [
  {
    icon: <Dashboard />,
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: <People />,
    label: 'Users',
    to: '/users',
  },
  {
    icon: <Groups />,
    label: 'Customers',
    to: '/customers',
  },
  {
    icon: <Groups />,
    label: 'Agents',
    to: '/agents',
  },
  {
    icon: <Receipt />,
    label: 'Invoice Categories',
    to: '/invoice-categories',
  },
  {
    icon: <Receipt />,
    label: 'Invoices',
    to: '/invoices',
  },
  {
    icon: <AccountBalance />,
    label: 'Transaction Types',
    to: '/transaction-types',
  },
  {
    icon: <AccountBalance />,
    label: 'Transactions',
    to: '/transactions',
  },
  {
    icon: <DataUsage />,
    label: 'Reports',
    to: '/reports',
  },
];
