/* eslint-disable @typescript-eslint/no-explicit-any */
export enum EAppRoutes {
  APP = '/',

  SETTINGS = '/settings',

  PROFILE = '/profile',

  DASHBOARD = '/dashboard',

  MASTERS = '/masters',
  MASTERS_HOME = '/masters/home',

  USERS = '/masters/users',
  USERS_LIST = '/masters/users/list',
  USERS_CREATE = '/masters/users/create',
  USERS_UPDATE = '/masters/users/update/:id',

  CUSTOMERS = '/masters/customers',
  AGENTS = '/masters/agents',
  INVOICE_CATEGORIES = '/masters/invoice-categories',
  TRANSACTION_TYPES = '/masters/transaction-types',

  INVOICES = '/invoices',

  TRANSACTIONS = '/transactions',

  REPORTS = '/reports',
  REPORTS_HOME = '/reports/home',
}

export interface IRouteMetaMap {
  label?: string;
  path: string | ((params: any) => string);
  isPlaceholder?: boolean;
  redirectRoute?: string;
}

export type TAppRoutesMap = Record<keyof typeof EAppRoutes, IRouteMetaMap>;

export const AppRoutes: TAppRoutesMap = {
  APP: {
    isPlaceholder: true,
    path: EAppRoutes.APP,
  },

  SETTINGS: {
    label: 'Settings',
    path: EAppRoutes.SETTINGS,
  },

  PROFILE: {
    label: 'Profile',
    path: EAppRoutes.PROFILE,
  },

  DASHBOARD: {
    label: 'Dashboard',
    path: EAppRoutes.DASHBOARD,
  },

  MASTERS: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.MASTERS_HOME,
    path: EAppRoutes.MASTERS,
  },
  MASTERS_HOME: {
    label: 'Masters',
    path: EAppRoutes.MASTERS_HOME,
  },

  USERS: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.USERS_LIST,
    path: EAppRoutes.USERS,
  },
  USERS_LIST: {
    label: 'Users Listing',
    path: EAppRoutes.USERS_LIST,
  },
  USERS_CREATE: {
    label: 'Create User',
    path: EAppRoutes.USERS_CREATE,
  },
  USERS_UPDATE: {
    label: 'Update User',
    path: (id: string | number) => EAppRoutes.USERS_UPDATE.replace(':id', String(id)),
  },

  CUSTOMERS: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.CUSTOMERS,
  },
  AGENTS: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.AGENTS,
  },
  INVOICE_CATEGORIES: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.INVOICE_CATEGORIES,
  },
  TRANSACTION_TYPES: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.TRANSACTION_TYPES,
  },

  INVOICES: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.INVOICES,
  },

  TRANSACTIONS: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.TRANSACTIONS,
  },

  REPORTS: {
    isPlaceholder: true,
    redirectRoute: '',
    path: EAppRoutes.REPORTS,
  },
  REPORTS_HOME: { label: 'Home', path: EAppRoutes.REPORTS_HOME },
};
