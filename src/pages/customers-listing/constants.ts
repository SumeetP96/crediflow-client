import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TCustomerStatus, TCustomerStatusLabel } from './types';

export const customerStatusOptions: IDataTableFilterSelectOption<
  TCustomerStatusLabel,
  TCustomerStatus
>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
