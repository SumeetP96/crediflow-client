import { IUser, TUserRole, TUserStatus } from '../../helpers/interfaces';

export interface IUsersWithCount {
  count: number;
  rows: IUser[];
}

export type TUserRoleFilterValue = TUserRole;

export type TUserRoleFilterLabel = 'Super Admin' | 'Admin' | 'Employee';

export interface IUserRoleFilterOption {
  label: TUserRoleFilterLabel;
  value: TUserRoleFilterValue;
}

export type TUserStatusFilterValue = 'all' | TUserStatus;

export type TUserStatusFilterLabel = 'All' | 'Active' | 'Inactive';

export interface IUserStatusFilterOption {
  label: TUserStatusFilterLabel;
  value: TUserStatusFilterValue;
}
