import { FormApi } from '@tanstack/react-form';
import { ZodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { ECustomerContactNumberStatus } from '../customers-listing/types';
import { IFormCustomer } from './types';

type TForm = FormApi<IFormCustomer, ZodValidator>;

export const passwordSchema = (form: TForm) => {
  const contactNumbers = form.getFieldInfo('contactNumbers');
  console.log('🚀 ~ passwordSchema ~ contactNumbers:', contactNumbers);

  return z.array(
    z.object({
      value: z
        .string()
        .min(8, 'Enter atleast 8 digits')
        .max(10, 'Cannot exceed 10 digits')
        .optional(),
      isPrimary: z.boolean(),
      status: z.enum([ECustomerContactNumberStatus.ACTIVE, ECustomerContactNumberStatus.INACTIVE]),
    }),
  );
};
