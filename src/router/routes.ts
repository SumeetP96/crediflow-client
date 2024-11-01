export enum EAppRoutes {
  APP = '/',

  LOGIN = '/login',

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
  CUSTOMERS_LIST = '/masters/customers/list',
  CUSTOMERS_CREATE = '/masters/customers/create',
  CUSTOMERS_UPDATE = '/masters/customers/update/:id',

  AGENTS = '/masters/agents',
  AGENTS_LIST = '/masters/agents/list',
  AGENTS_CREATE = '/masters/agents/create',
  AGENTS_UPDATE = '/masters/agents/update/:id',

  INVOICE_CATEGORIES = '/masters/invoice-categories',
  INVOICE_CATEGORIES_LIST = '/masters/invoice-categories/list',
  INVOICE_CATEGORIES_CREATE = '/masters/invoice-categories/create',
  INVOICE_CATEGORIES_UPDATE = '/masters/invoice-categories/update/:id',

  TRANSACTION_TYPES = '/masters/transaction-types',
  TRANSACTION_TYPES_LIST = '/masters/transaction-types/list',
  TRANSACTION_TYPES_CREATE = '/masters/transaction-types/create',
  TRANSACTION_TYPES_UPDATE = '/masters/transaction-types/update/:id',

  INVOICES = '/invoices',
  INVOICES_LIST = '/invoices/list',
  INVOICES_CREATE = '/invoices/create',
  INVOICES_UPDATE = '/invoices/update/:id',

  TRANSACTIONS = '/transactions',

  REPORTS = '/reports',
  REPORTS_HOME = '/reports/home',

  ERROR = '/error/:code',
}

export interface IRouteMetaMap {
  label?: string;
  path: string | ((params: any) => string);
  isPlaceholder?: boolean;
  redirectRoute?: string;
}

export type TAppRoutesMap = Record<keyof typeof EAppRoutes, IRouteMetaMap>;

export const AppRoutesForBreadcrumbs: TAppRoutesMap = {
  APP: {
    isPlaceholder: true,
    path: EAppRoutes.APP,
  },

  LOGIN: {
    path: EAppRoutes.LOGIN,
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

  // Users
  USERS: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.USERS_LIST,
    path: EAppRoutes.USERS,
  },
  USERS_LIST: {
    label: 'Users',
    path: EAppRoutes.USERS_LIST,
  },
  USERS_CREATE: {
    label: 'Create',
    path: EAppRoutes.USERS_CREATE,
  },
  USERS_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.USERS_UPDATE.replace(':id', String(id)),
  },

  // Customers
  CUSTOMERS: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.CUSTOMERS_LIST,
    path: EAppRoutes.CUSTOMERS,
  },
  CUSTOMERS_LIST: {
    label: 'Customers',
    path: EAppRoutes.CUSTOMERS_LIST,
  },
  CUSTOMERS_CREATE: {
    label: 'Create',
    path: EAppRoutes.CUSTOMERS_CREATE,
  },
  CUSTOMERS_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.CUSTOMERS_UPDATE.replace(':id', String(id)),
  },

  // Agents
  AGENTS: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.AGENTS_LIST,
    path: EAppRoutes.AGENTS,
  },
  AGENTS_LIST: {
    label: 'Agents',
    path: EAppRoutes.AGENTS_LIST,
  },
  AGENTS_CREATE: {
    label: 'Create',
    path: EAppRoutes.AGENTS_CREATE,
  },
  AGENTS_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.AGENTS_UPDATE.replace(':id', String(id)),
  },

  // Invoice Categories
  INVOICE_CATEGORIES: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.INVOICE_CATEGORIES_LIST,
    path: EAppRoutes.INVOICE_CATEGORIES,
  },
  INVOICE_CATEGORIES_LIST: {
    label: 'Invoice Categories',
    path: EAppRoutes.INVOICE_CATEGORIES_LIST,
  },
  INVOICE_CATEGORIES_CREATE: {
    label: 'Create',
    path: EAppRoutes.INVOICE_CATEGORIES_CREATE,
  },
  INVOICE_CATEGORIES_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.INVOICE_CATEGORIES_UPDATE.replace(':id', String(id)),
  },

  // Transaction Types
  TRANSACTION_TYPES: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.TRANSACTION_TYPES_LIST,
    path: EAppRoutes.TRANSACTION_TYPES,
  },
  TRANSACTION_TYPES_LIST: {
    label: 'Transaction Types',
    path: EAppRoutes.TRANSACTION_TYPES_LIST,
  },
  TRANSACTION_TYPES_CREATE: {
    label: 'Create',
    path: EAppRoutes.TRANSACTION_TYPES_CREATE,
  },
  TRANSACTION_TYPES_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.TRANSACTION_TYPES_UPDATE.replace(':id', String(id)),
  },

  // Invoices
  INVOICES: {
    isPlaceholder: true,
    redirectRoute: EAppRoutes.INVOICES_LIST,
    path: EAppRoutes.INVOICES,
  },
  INVOICES_LIST: {
    label: 'Transaction Types',
    path: EAppRoutes.INVOICES_LIST,
  },
  INVOICES_CREATE: {
    label: 'Create',
    path: EAppRoutes.INVOICES_CREATE,
  },
  INVOICES_UPDATE: {
    label: 'Update',
    path: (id: string | number) => EAppRoutes.INVOICES_UPDATE.replace(':id', String(id)),
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

  ERROR: {
    label: 'Error',
    path: (code: number) => EAppRoutes.ERROR.replace(':code', String(code)),
  },
};
