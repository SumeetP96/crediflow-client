import { TUserRole, TUserStatus } from '../../helpers/interfaces';

export type TUserRoleSelectValue = TUserRole;

export type TUserRoleSelectLabel = 'Super Admin' | 'Admin' | 'Employee';

export interface IUserRoleSelectOption {
  label: TUserRoleSelectLabel;
  value: TUserRoleSelectValue;
}

export type TUserStatusSelectValue = TUserStatus;

export type TUserStatusSelectLabel = 'Active' | 'Inactive';

export interface IUserStatusSelectOption {
  label: TUserStatusSelectLabel;
  value: TUserStatusSelectValue;
}

export interface IFormUser {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  role?: TUserRole | string;
  status?: TUserStatus;
}
