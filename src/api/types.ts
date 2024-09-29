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
