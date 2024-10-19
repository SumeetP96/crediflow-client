import { TUserStatus } from '../../helpers/types';
import { ICustomer, ICustomerAddress, ICustomerContactNumber } from '../customers-listing/types';

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
  contactNumbers?: ICustomerContactNumber[];
  addresses?: ICustomerAddress[];
  isReseller: boolean;
  openingBalance?: number;
  status: TUserStatus;
}
