import {
  IUserRoleFilterOption,
  IUserStatusFilterOption,
  TUserRoleFilterLabel,
  TUserRoleFilterValue,
} from './interfaces';

export const userRoleLabelMap: Record<TUserRoleFilterValue, TUserRoleFilterLabel> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  employee: 'Employee',
};

export const userRoles: IUserRoleFilterOption[] = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
];

export const userStatus: IUserStatusFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
