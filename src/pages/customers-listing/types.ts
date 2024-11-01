import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon } from '../../helpers/types';

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

export type TCustomerStatusLabel = 'Active' | 'Inactive';

export interface ICustomer extends IModelCommon {
  parentId: number;
  name: string;
  contactNumbers: ICustomerContactNumber[];
  addresses: ICustomerAddress[];
  isReseller: boolean;
  balance: number;
  openingBalance: number;
  status: TCustomerStatus;
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
