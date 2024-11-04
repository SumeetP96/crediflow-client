import { IAgent } from '../agents-listing/types';
import { ICustomer } from '../customers-listing/types';

export interface IFormInvoice {
  invoiceCategoryId: number;
  customerId: number;
  date: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  remarks: string;
}

interface IOption {
  value: number;
  label: string;
}

export type TInvoiceCustomerOption = ICustomer & IOption;

export type TInvoiceAgentOption = IAgent & IOption;

export enum EInvoiceRelation {
  CUSTOMERS = 'customers',
  AGENTS = 'agents',
}

export interface IInvoiceRelationValue {
  id: number;
  isPlaceholder: boolean;
}

export interface IInvoiceRelations {
  customers: IInvoiceRelationValue[];
  agents: IInvoiceRelationValue[];
}
