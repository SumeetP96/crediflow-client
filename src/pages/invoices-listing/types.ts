import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon, IUser } from '../../helpers/types';
import { IAgent } from '../agents-listing/types';
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

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface IInvoice extends IModelCommon {
  invoiceCategoryId: number;
  customerId: number;
  userId: number;
  date: string;
  invoiceNumber: string;
  invoiceItems: IInvoiceItem[] | null;
  amount: number;
  balance: number;
  dueDate: string;
  status: EInvoiceStatus;
  remarks: string | null;

  // Relations
  invoiceCategory: IInvoiceCategory;
  customer: ICustomer;
  user: IUser;
  invoiceRelations: IInvoiceRelation[];
}

export interface IInvoiceRelation extends IModelCommon {
  invoiceId: number;
  customerId: number | null;
  agentId: number | null;

  // Relations
  invoice: IInvoice;
  customer: ICustomer;
  agent: IAgent;
}

export type TInvoiceRecord = IInvoice & IDataTableExtraColumns;

export interface IInvoicesWithCount {
  count: number;
  rows: TInvoiceRecord[];
}
