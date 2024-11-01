import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TUserRole, TUserRoleLabel, TUserStatus, TUserStatusLabel } from '../../helpers/types';

export const userRoleOptions: IDataTableFilterSelectOption<TUserRoleLabel, TUserRole>[] = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
];

export const userStatusOptions: IDataTableFilterSelectOption<TUserStatusLabel, TUserStatus>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
