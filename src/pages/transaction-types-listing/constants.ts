import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TTransactionTypeStatus, TTransactionTypeStatusSelectLabel } from './types';

export const transactionTypeStatusOptions: IDataTableFilterSelectOption<
  TTransactionTypeStatusSelectLabel,
  TTransactionTypeStatus
>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
