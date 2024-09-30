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
};
