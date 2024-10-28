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

export enum EAddressType {
  HOME = 'home',
  WORK = 'work',
}

export interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numericCode: string;
  phoneCode: string;
  currency: string;
  currencyName: string;
  emoji: string;
  emojiUnicode: string;
}

export interface IState {
  id: number;
  countryId: number;
  name: string;
  stateCode: string;
  country: ICountry;
}

export interface ICity {
  id: number;
  countryId: number;
  stateId: number;
  name: string;
  country: ICountry;
  state: IState;
}
