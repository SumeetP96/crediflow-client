import {
  AccountCircleTwoTone,
  DataUsageTwoTone,
  DescriptionTwoTone,
  FolderOpenTwoTone,
  PaidTwoTone,
  PeopleAltTwoTone,
  ReceiptLongTwoTone,
  SpaceDashboardTwoTone,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { AppRoutes } from '../../router/routes';

export interface INavLink {
  id: string;
  icon: ReactNode;
  label: string;
  to?: string;
  children?: INavLink[];
  description?: string;
}

export const navLinks: INavLink[] = [
  {
    id: 'dashboard',
    icon: <SpaceDashboardTwoTone />,
    label: 'Dashboard',
    to: AppRoutes.DASHBOARD,
  },
  {
    id: 'masters',
    icon: <FolderOpenTwoTone />,
    label: 'Masters',
    to: AppRoutes.MASTERS,
    children: [
      {
        id: 'users',
        icon: <AccountCircleTwoTone />,
        label: 'Users',
        to: AppRoutes.USERS,
        description: 'Manage system users',
      },
      {
        id: 'customers',
        icon: <PeopleAltTwoTone />,
        label: 'Customers',
        to: AppRoutes.CUSTOMERS,
        description: 'Manage business customers',
      },
      {
        id: 'agents',
        icon: <PeopleAltTwoTone />,
        label: 'Agents',
        to: AppRoutes.AGENTS,
        description: 'Manage business agents',
      },
      {
        id: 'invoice-categories',
        icon: <DescriptionTwoTone />,
        label: 'Invoice Categories',
        to: AppRoutes.INVOICE_CATEGORIES,
        description: 'Manage invoice categories',
      },
      {
        id: 'transaction-types',
        icon: <DescriptionTwoTone />,
        label: 'Transaction Types',
        to: AppRoutes.TRANSACTION_TYPES,
        description: 'Manage transaction types',
      },
    ],
  },
  {
    id: 'invoices',
    icon: <ReceiptLongTwoTone />,
    label: 'Invoices',
    to: AppRoutes.INVOICES,
  },
  {
    id: 'transactions',
    icon: <PaidTwoTone />,
    label: 'Transactions',
    to: AppRoutes.TRANSACTIONS,
  },
  {
    id: 'reports',
    icon: <DataUsageTwoTone />,
    label: 'Reports',
    to: AppRoutes.REPORTS_HOME,
  },
];
