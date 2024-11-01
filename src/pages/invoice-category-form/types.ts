import { IInvoiceCategory, TInvoiceCategoryeStatus } from '../invoice-categories-listing/types';

export type TInvoiceCategoryStatus = Pick<IInvoiceCategory, 'id' | 'name'>;

export type TInvoiceCategoryStatusSelectLabel = 'Active' | 'Inactive';

export interface IInvoiceCategoryStatusSelectOption {
  label: TInvoiceCategoryStatusSelectLabel;
  value: TInvoiceCategoryeStatus;
}

export interface IFormInvoiceCategory {
  name: string;
  prefix: string;
  suffix: string;
  description: string;
  isAutoIncrement: boolean;
  status: TInvoiceCategoryeStatus;
}
