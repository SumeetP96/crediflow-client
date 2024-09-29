import { IFieldError } from '../../api/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFormFieldErrors = (form: any, fieldErrors: IFieldError[]) => {
  if (fieldErrors.length > 0) {
    fieldErrors.forEach((field) => {
      form.state.fieldMeta[field.field].errors = [field.error];
    });
  }
};
