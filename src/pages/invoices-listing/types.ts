import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon, IUser } from '../../helpers/types';
import { ICustomer } from '../customers-listing/types';
import { IInvoiceCategory } from '../invoice-categories-listing/types';

export enum EInvoiceStatus {
  PAID = 'paid',
  PARTIAL_PAID = 'partial_paid',
  UNPAID = 'unpaid',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
}

export type TInvoiceStatusLabel = 'Paid' | 'Partial Paid' | 'Unpaid' | 'On Hold' | 'Cancelled';

export interface IInvoice extends IModelCommon {
  invoiceCategoryId: number;
  customerId: number;
  userId: number;
  date: string;
  invoiceNumber: string;
  amount: number;
  balance: number;
  dueDate: string;
  status: EInvoiceStatus;

  // Relations
  invoiceCategory: IInvoiceCategory;
  customer: ICustomer;
  user: IUser;
}

export type TInvoiceRecord = IInvoice & IDataTableExtraColumns;

export interface IInvoicesWithCount {
  count: number;
  rows: TInvoiceRecord[];
}