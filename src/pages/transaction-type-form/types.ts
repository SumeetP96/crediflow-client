import { TTransactionTypeStatus } from '../transaction-types-listing/types';

export interface IFormTransactionType {
  name: string;
  isDeduction: boolean;
  description: string;
  status: TTransactionTypeStatus;
}
