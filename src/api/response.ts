import { IApiErrorResponse, IFieldError, IParsedApiError } from './types';

export const parseApiErrorObject = (error: any): IApiErrorResponse => {
  return error?.response?.data || { message: 'Something went wrong' };
};

export const parseZodValidationErrors = (error: any): IParsedApiError => {
  const errorObj = parseApiErrorObject(error);

  const message = errorObj.message || error.message || 'Something went wrong';

  if (errorObj.issues?.length) {
    const errors: string[] = [];
    const fieldErrors: IFieldError[] = [];

    errorObj.issues.forEach((issue) => {
      errors.push(`${issue.path}: ${issue.message}`);
      fieldErrors.push({ field: String(issue.path[0]), error: issue.message });
    });

    return { message, errors, fieldErrors };
  }

  return { message, errors: [], fieldErrors: [] };
};

export const parseApiErrorResponse = (error: any): IParsedApiError => {
  const errorObj = parseApiErrorObject(error);

  const message = errorObj.message || error.message || 'Something went wrong';

  if (errorObj.issues?.length) {
    return parseZodValidationErrors(error);
  }

  return { message, errors: [], fieldErrors: [] };
};
