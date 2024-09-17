import { TSortOrder } from './interfaces';

export const defaultQueryParamsArraySeparator = '|';

export const defaultPage = 0;

export const defaultPerPage = 5;

export const defaultPerPageOptions = [5, 10, 25, 50, 100];

export const defaultSortOrder: TSortOrder = 'none';

export const ApiEndpoints = {
  ALL_USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  CREATE_USER: '/users',
  UPDATE_USER_BY_ID: (id: number) => `/users/${id}`,
};