import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TInvoiceCategoryeStatus, TInvoiceCategoryeStatusLabel } from './types';

export const invoiceCategoryStatusOptions: IDataTableFilterSelectOption<
  TInvoiceCategoryeStatusLabel,
  TInvoiceCategoryeStatus
>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
