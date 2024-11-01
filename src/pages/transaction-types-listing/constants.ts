import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TTransactionTypeStatus, TTransactionTypeStatusLabel } from './types';

export const transactionTypeStatusOptions: IDataTableFilterSelectOption<
  TTransactionTypeStatusLabel,
  TTransactionTypeStatus
>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
