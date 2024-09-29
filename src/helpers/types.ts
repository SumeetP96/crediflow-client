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

export type TListingFilterValue = string | number | boolean;

export interface IListingSelectedFilter<Col> extends IDataTableFilter {
  field: keyof Col;
  value: string;
}
