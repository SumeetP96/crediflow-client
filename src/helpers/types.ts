import { IDataTableFilter } from '../components/data-table/types';

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

export interface IAuthUser extends Pick<IUser, 'id' | 'name' | 'username'> {
  id: number;
  name: string;
  username: string;
}

export type TListingFilterValue = string | number | boolean;

export interface IListingSelectedFilter<Col> extends IDataTableFilter<Col> {
  field: keyof Col;
  title: string;
  value: string;
}
