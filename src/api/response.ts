/* eslint-disable @typescript-eslint/no-explicit-any */

import { IApiErrorResponse, IParsedApiError } from './interfaces';

export const parseApiErrorObject = (error: any): IApiErrorResponse => {
  return error?.response?.data || { message: 'Something went wrong' };
};

export const parseZodValidationErrors = (error: any): IParsedApiError => {
  const errorObj = parseApiErrorObject(error);

  const message = errorObj.message || error.message || 'Something went wrong';

  if (errorObj.issues?.length) {
    const errors = errorObj.issues.map((issue) => {
      return `${issue.path}: ${issue.message}`;
    });

    return { message, errors };
  }

  return { message, errors: [] };
};

export const parseApiErrorResponse = (error: any): IParsedApiError => {
  const errorObj = parseApiErrorObject(error);

  const message = errorObj.message || error.message || 'Something went wrong';

  if (errorObj.issues?.length) {
    return parseZodValidationErrors(error);
  }

  return { message, errors: [] };
};
