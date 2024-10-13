import { TUserStatus } from '../../helpers/types';
import { ICustomer } from '../customers-listing/types';

export type TCustomerStatus = 'active' | 'in_active';

export type TCustomerStatusSelectLabel = 'Active' | 'Inactive';

export interface ICustomerStatusSelectOption {
  label: TCustomerStatusSelectLabel;
  value: TCustomerStatus;
}

export type TCustomerOption = Pick<ICustomer, 'id' | 'name'>;

export interface IFormCustomer {
  parentId?: number | null;
  name: string;
  contactNumbers?: string[];
  addresses?: string[];
  isReseller: boolean;
  openingBalance?: number;
  status: TUserStatus;
}
