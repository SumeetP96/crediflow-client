import {
  ICustomer,
  ICustomerAddress,
  ICustomerContactNumber,
  TCustomerStatus,
} from '../customers-listing/types';

export type TCustomerOption = Pick<ICustomer, 'id' | 'name'>;

export interface IFormCustomer {
  parentId?: number | null;
  name: string;
  contactNumbers?: ICustomerContactNumber[];
  addresses?: ICustomerAddress[];
  isReseller: boolean;
  openingBalance?: number;
  status: TCustomerStatus;
}
