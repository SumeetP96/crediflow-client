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
  Settings,
  SettingsOutlined,
  SpaceDashboard,
  SpaceDashboardOutlined,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { AppRoutes } from '../../router/routes';

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
    to: AppRoutes.DASHBOARD,
  },
  {
    id: 'masters',
    icon: <FolderOpenOutlined />,
    activeIcon: <FolderOpen />,
    label: 'Masters',
    to: AppRoutes.MASTERS,
    children: [
      {
        id: 'users',
        icon: <AccountCircleOutlined />,
        activeIcon: <AccountCircle />,
        label: 'Users',
        to: AppRoutes.USERS,
        description: 'Manage system users',
      },
      {
        id: 'customers',
        icon: <PeopleAltOutlined />,
        activeIcon: <PeopleAlt />,
        label: 'Customers',
        to: AppRoutes.CUSTOMERS,
        description: 'Manage business customers',
      },
      {
        id: 'agents',
        icon: <PeopleAltOutlined />,
        activeIcon: <PeopleAlt />,
        label: 'Agents',
        to: AppRoutes.AGENTS,
        description: 'Manage business agents',
      },
      {
        id: 'invoice-categories',
        icon: <DescriptionOutlined />,
        activeIcon: <Description />,
        label: 'Invoice Categories',
        to: AppRoutes.INVOICE_CATEGORIES,
        description: 'Manage invoice categories',
      },
      {
        id: 'transaction-types',
        icon: <DescriptionOutlined />,
        activeIcon: <Description />,
        label: 'Transaction Types',
        to: AppRoutes.TRANSACTION_TYPES,
        description: 'Manage transaction types',
      },
    ],
  },
  {
    id: 'invoices',
    icon: <ReceiptLongOutlined />,
    activeIcon: <ReceiptLong />,
    label: 'Invoices',
    to: AppRoutes.INVOICES,
  },
  {
    id: 'transactions',
    icon: <PaidOutlined />,
    activeIcon: <Paid />,
    label: 'Transactions',
    to: AppRoutes.TRANSACTIONS,
  },
  {
    id: 'reports',
    icon: <DataUsageOutlined />,
    activeIcon: <DataUsage />,
    label: 'Reports',
    to: AppRoutes.REPORTS_HOME,
  },
];

export const bottomNavLinks: INavLink[] = [
  {
    id: 'settings',
    icon: <SettingsOutlined />,
    activeIcon: <Settings />,
    label: 'Settings',
    to: AppRoutes.DASHBOARD,
  },
];
