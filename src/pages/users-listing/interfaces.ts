export interface IUser {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type TUserRoleFilterValue = 'super_admin' | 'admin' | 'employee';

export type TUserRoleFilterLabel = 'Super Admin' | 'Admin' | 'Employee';

export interface IUserRoleFilterOption {
  label: TUserRoleFilterLabel;
  value: TUserRoleFilterValue;
}

export type TUserStatusFilterValue = 'all' | 'active' | 'in_active' | 'deleted';

export type TUserStatusFilterLabel = 'All' | 'Active' | 'Inactive' | 'Deleted';

export interface IUserStatusFilterOption {
  label: TUserStatusFilterLabel;
  value: TUserStatusFilterValue;
}
