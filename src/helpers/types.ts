export type TSortOrder = 'asc' | 'desc' | 'none';

export type TUserRole = 'super_admin' | 'admin' | 'employee';

export type TUserStatus = 'active' | 'in_active';
export interface IUser {
  id: number;
  name: string;
  username: string;
  role: TUserRole;
  status: TUserStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type TMultiSelectOptionValue = string | number | boolean;
