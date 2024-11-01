import { IDataTableFilter } from '../components/data-table/types';

export interface IModelCommon {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type TSortOrder = 'asc' | 'desc' | 'none';

export type TUserRole = 'super_admin' | 'admin' | 'employee';

export type TUserRoleLabel = 'Super Admin' | 'Admin' | 'Employee';

export type TUserStatus = 'active' | 'in_active';

export type TUserStatusLabel = 'Active' | 'Inactive';

export interface IUser extends IModelCommon {
  name: string;
  username: string;
  role: TUserRole;
  status: TUserStatus;
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

export enum ELocalStorageKeys {
  AUTH_USER = 'user-details',
  THEME = 'mui-theme',
  FONT = 'mui-font',
}

export enum EQueryParamKeys {
  // App
  SETTINGS_DRAWER = 'settingsDrawer',

  // Data Table
  IS_DENSE = 'isDense',
  COLS = 'cols',
  SEARCH = 'search',
  PAGE = 'page',
  PER_PAGE = 'perPage',
  SORT_BY = 'sortBy',
  SORT_ORDER = 'sortOrder',
}

export enum ERecordStatus {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}
