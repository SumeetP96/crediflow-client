import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { EInvoiceStatus, TInvoiceStatusLabel } from './types';

export const invoiceStatusOptions: IDataTableFilterSelectOption<
  TInvoiceStatusLabel,
  EInvoiceStatus
>[] = [
  { label: 'Paid', value: EInvoiceStatus.PAID },
  { label: 'Partial Paid', value: EInvoiceStatus.PARTIAL_PAID },
  { label: 'Unpaid', value: EInvoiceStatus.UNPAID },
  { label: 'On Hold', value: EInvoiceStatus.ON_HOLD },
  { label: 'Cancelled', value: EInvoiceStatus.CANCELLED },
];
