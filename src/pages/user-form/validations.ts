import { FormApi } from '@tanstack/react-form';
import { ZodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { IFormUser } from './types';

type TForm = FormApi<IFormUser, ZodValidator>;

export const passwordSchema = (form: TForm) => {
  const min = 6;
  const max = 40;

  const betweenMsg = `Length must be between ${min} and ${max} characters`;

  return {
    create: z.string().min(min, betweenMsg).max(max, betweenMsg),

    update: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value && !form.getFieldValue('confirmPassword')) {
            form.validateField('confirmPassword', 'change');
          }
          return !value || (value && value.length <= max && value.length >= min);
        },
        { message: betweenMsg },
      ),
  };
};

export const confirmPasswordSchema = (form: TForm) => {
  const min = 6;
  const max = 40;

  const betweenMsg = `Length must be between ${min} and ${max} characters`;
  const matchMsg = 'Password and Confirm Password should match';

  return {
    create: z
      .string()
      .min(min, betweenMsg)
      .max(max, betweenMsg)
      .refine((value) => form.getFieldValue('password') === value, { message: matchMsg }),

    update: z
      .string()
      .optional()
      .refine((value) => !value || (value && value.length <= max && value.length >= min), {
        message: betweenMsg,
      })
      .refine(
        (value) => {
          const password = form.getFieldValue('password');
          return (!value && !password) || password === value;
        },
        { message: matchMsg },
      ),
  };
};
