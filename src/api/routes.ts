export const ApiRoutes = {
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_PROFILE: '/auth/profile',

  USER_ALL: '/users',
  USER_BY_ID: (id: number | string) => `/users/${String(id)}`,
  USER_CREATE: '/users',
  USER_UPDATE: (id: number | string) => `/users/${String(id)}`,
  USER_DELETE: (id: number | string) => `/users/${String(id)}`,
  USER_RESTORE: (id: number | string) => `/users/restore/${String(id)}`,

  CUSTOMER_ALL: '/customers',
  CUSTOMER_BY_ID: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_CREATE: '/customers',
  CUSTOMER_UPDATE: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_DELETE: (id: number | string) => `/customers/${String(id)}`,
  CUSTOMER_RESTORE: (id: number | string) => `/customers/restore/${String(id)}`,
  CUSTOMER_OPTIONS: '/customers/options',

  WORLD_COUNTRIES: (search?: string) => `/world/countries?search=${search || ''}`,
  WORLD_STATES: (search?: string) => `/world/states?search=${search || ''}`,
  WORLD_CITIES: '/world/cities',
};
