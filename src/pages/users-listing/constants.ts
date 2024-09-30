import { IDataTableFilterSelectOption } from '../../components/data-table/types';

export const userRoleOptions: IDataTableFilterSelectOption[] = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
];

export const userStatusOptions: IDataTableFilterSelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];

export const showDeletedOptions: IDataTableFilterSelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
