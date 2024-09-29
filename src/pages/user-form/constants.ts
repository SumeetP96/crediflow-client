import { IUserRoleFilterOption } from '../users-listing/types';
import { IUserStatusSelectOption } from './types';

export const userRoles: IUserRoleFilterOption[] = [
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
];

export const userStatus: IUserStatusSelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
