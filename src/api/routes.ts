export const ApiRoutes = {
  USER_ALL: '/users',
  USER_BY_ID: (id: number | string) => `/users/${String(id)}`,
  USER_CREATE: '/users',
  USER_UPDATE: (id: number | string) => `/users/${String(id)}`,
};
