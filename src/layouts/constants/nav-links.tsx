import {
  AccountCircle,
  AccountCircleOutlined,
  DataUsage,
  DataUsageOutlined,
  Description,
  DescriptionOutlined,
  FolderOpen,
  FolderOpenOutlined,
  Paid,
  PaidOutlined,
  PeopleAlt,
  PeopleAltOutlined,
  ReceiptLong,
  ReceiptLongOutlined,
  SpaceDashboard,
  SpaceDashboardOutlined,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { AppRoute } from '../../router/helpers';

export interface INavLink {
  id: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  to?: string;
  children?: INavLink[];
  description?: string;
}

export const mainMenuLinks: INavLink[] = [
  {
    id: 'dashboard',
    icon: <SpaceDashboardOutlined />,
    activeIcon: <SpaceDashboard />,
    label: 'Dashboard',
    to: AppRoute('DASHBOARD'),
  },
  {
    id: 'invoices',
    icon: <ReceiptLongOutlined />,
    activeIcon: <ReceiptLong />,
    label: 'Invoices',
    to: AppRoute('INVOICES'),
  },
  {
    id: 'transactions',
    icon: <PaidOutlined />,
    activeIcon: <Paid />,
    label: 'Transactions',
    to: AppRoute('TRANSACTIONS'),
  },
  {
    id: 'reports',
    icon: <DataUsageOutlined />,
    activeIcon: <DataUsage />,
    label: 'Reports',
    to: AppRoute('REPORTS_HOME'),
  },
  {
    id: 'masters',
    icon: <FolderOpenOutlined />,
    activeIcon: <FolderOpen />,
    label: 'Masters',
    to: AppRoute('MASTERS_HOME'),
    children: [
      {
        id: 'users',
        icon: <AccountCircleOutlined />,
        activeIcon: <AccountCircle />,
        label: 'Users',
        to: AppRoute('USERS_LIST'),
        description: 'Manage system users',
      },
      {
        id: 'customers',
        icon: <PeopleAltOutlined />,
        activeIcon: <PeopleAlt />,
        label: 'Customers',
        to: AppRoute('CUSTOMERS'),
        description: 'Manage business customers',
      },
      {
        id: 'agents',
        icon: <PeopleAltOutlined />,
        activeIcon: <PeopleAlt />,
        label: 'Agents',
        to: AppRoute('AGENTS'),
        description: 'Manage business agents',
      },
      {
        id: 'invoice-categories',
        icon: <DescriptionOutlined />,
        activeIcon: <Description />,
        label: 'Invoice Categories',
        to: AppRoute('INVOICE_CATEGORIES'),
        description: 'Manage invoice categories',
      },
      {
        id: 'transaction-types',
        icon: <DescriptionOutlined />,
        activeIcon: <Description />,
        label: 'Transaction Types',
        to: AppRoute('TRANSACTION_TYPES'),
        description: 'Manage transaction types',
      },
    ],
  },
];

// export const bottomNavLinks: INavLink[] = [
//   {
//     id: 'settings',
//     icon: <SettingsOutlined />,
//     activeIcon: <Settings />,
//     label: 'Settings',
//     to: AppRoute('DASHBOARD'),
//   },
// ];
