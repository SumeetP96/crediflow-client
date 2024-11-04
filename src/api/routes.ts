export const ApiRoutes = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_PROFILE: '/auth/profile',

  // Users
  USER_ALL: '/users',
  USER_BY_ID: (id: number | string) => `/users/${String(id)}`,
  USER_CREATE: '/users',
  USER_UPDATE: (id: number | string) => `/users/${String(id)}`,
  USER_DELETE: (id: number | string) => `/users/${String(id)}`,
  USER_RESTORE: (id: number | string) => `/users/restore/${String(id)}`,

  // Customers
  CUSTOMER_ALL: '/customers',
  CUSTOMER_BY_ID: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_CREATE: '/customers',
  CUSTOMER_UPDATE: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_DELETE: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_RESTORE: (id: number | string) => `/customers/restore/${String(id)}`,
  CUSTOMER_OPTIONS: '/customers/options',

  // Agents
  AGENT_ALL: '/agents',
  AGENT_BY_ID: (id: number | string) => `/agents/${String(id)}`,
  AGENT_CREATE: '/agents',
  AGENT_UPDATE: (id: number | string) => `/agents/${String(id)}`,
  AGENT_DELETE: (id: number | string) => `/agents/${String(id)}`,
  AGENT_RESTORE: (id: number | string) => `/agents/restore/${String(id)}`,
  AGENT_OPTIONS: '/agents/options',

  // Invoice Categories
  INVOICE_CATEGORIES_ALL: '/invoice-categories',
  INVOICE_CATEGORIES_BY_ID: (id: number | string) => `/invoice-categories/${String(id)}`,
  INVOICE_CATEGORIES_CREATE: '/invoice-categories',
  INVOICE_CATEGORIES_UPDATE: (id: number | string) => `/invoice-categories/${String(id)}`,
  INVOICE_CATEGORIES_DELETE: (id: number | string) => `/invoice-categories/${String(id)}`,
  INVOICE_CATEGORIES_OPTIONS: '/invoice-categories/options',

  // Transaction Types
  TRANSACTION_TYPES_ALL: '/transaction-types',
  TRANSACTION_TYPES_BY_ID: (id: number | string) => `/transaction-types/${String(id)}`,
  TRANSACTION_TYPES_CREATE: '/transaction-types',
  TRANSACTION_TYPES_UPDATE: (id: number | string) => `/transaction-types/${String(id)}`,
  TRANSACTION_TYPES_DELETE: (id: number | string) => `/transaction-types/${String(id)}`,

  // Invoices
  INVOICES_ALL: '/invoices',
  INVOICES_BY_ID: (id: number | string) => `/invoices/${String(id)}`,
  INVOICES_CREATE: '/invoices',
  INVOICES_UPDATE: (id: number | string) => `/invoices/${String(id)}`,
  INVOICES_DELETE: (id: number | string) => `/invoices/${String(id)}`,
};
