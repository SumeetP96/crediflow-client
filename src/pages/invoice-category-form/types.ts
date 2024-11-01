import { TInvoiceCategoryeStatus } from '../invoice-categories-listing/types';

export interface IFormInvoiceCategory {
  name: string;
  prefix: string;
  suffix: string;
  description: string;
  isAutoIncrement: boolean;
  status: TInvoiceCategoryeStatus;
}
