import { ZodIssue } from 'zod';

export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface IAxiosApiResponse<T> {
  data: IApiResponse<T>;
}

export interface IApiErrorResponse {
  issues?: ZodIssue[];
  message?: string;
  path?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface IFieldError {
  field: string;
  error: string;
}

export interface IParsedApiError {
  message: string;
  errors: string[];
  fieldErrors: IFieldError[];
}

export enum QueryKeys {
  // Auth
  AUTH_LOGIN = 'auth:login',
  AUTH_LOGOUT = 'auth:logout',
  AUTH_PROFILE = 'auth:profile',

  // Users
  USERS_LISTING = 'users:listing',
  USERS_BY_ID = 'users:by_id',
  USERS_CREATE = 'users:create',
  USERS_UPDATE = 'users:update',
  USERS_DELETE = 'users:delete',
  USERS_RESTORE = 'users:restore',

  // Customers
  CUSTOMERS_LISTING = 'customers:listing',
  CUSTOMERS_BY_ID = 'customers:by_id',
  CUSTOMERS_CREATE = 'customers:create',
  CUSTOMERS_UPDATE = 'customers:update',
  CUSTOMERS_DELETE = 'customers:delete',
  CUSTOMERS_RESTORE = 'customers:restore',
  CUSTOMERS_OPTIONS = 'customers:options',

  // World
  GET_COUNTRIES = 'world:countries',
  GET_STATES = 'world:states',
  GET_CITIES = 'world:cities',
}
