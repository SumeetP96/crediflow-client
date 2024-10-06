import { IDataTableExtraColumns } from '../../components/data-table/types';

export type TCustomerStatus = 'active' | 'in_active';

export interface ICustomer {
  id: number;
  parentId: number;
  name: string;
  constactNumbers: string[];
  addresses: string[];
  isReseller: boolean;
  balance: number;
  status: TCustomerStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
