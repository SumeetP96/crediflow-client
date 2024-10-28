import { IDataTableExtraColumns } from '../../components/data-table/types';

export enum ECustomerContactNumberStatus {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}

export interface ICustomerContactNumber {
  number?: string;
  status?: ECustomerContactNumberStatus;
  isPrimary?: boolean;
}

export enum ECustomerAddressStatus {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}

export interface ICustomerAddress {
  address?: string;
  status?: ECustomerAddressStatus;
  isPrimary?: boolean;
}

export type TCustomerStatus = 'active' | 'in_active';

export interface ICustomer {
  id: number;
  parentId: number;
  name: string;
  contactNumbers: ICustomerContactNumber[];
  addresses: ICustomerAddress[];
  isReseller: boolean;
  balance: number;
  openingBalance: number;
  status: TCustomerStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  parent: ICustomer;
}

export interface ICustomerListingAdditionalFilters {
  isDeletedShown?: boolean;
}

export type TCustomerRecord = ICustomer &
  IDataTableExtraColumns &
  ICustomerListingAdditionalFilters;

export interface ICustomersWithCount {
  count: number;
  rows: TCustomerRecord[];
}
