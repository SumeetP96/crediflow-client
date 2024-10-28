import { ERecordStatus } from '../../helpers/types';

export type ITextMultiInputRecordType = 'contact-numbers' | 'addresses';

export type TTextMultiInputErrorMap = {
  [key in keyof TInputValue]: string;
};

export interface IInputValue {
  index: number;
  isManuallyAdded: boolean;
  errorMap: TTextMultiInputErrorMap;
  isPrimary: boolean;
  status: ERecordStatus;
}

export interface IInputContactNumberValue extends IInputValue {
  number?: string | number;
}

export interface IInputAddressValue extends IInputValue {
  address?: string;
}

export type TInputValue = IInputContactNumberValue & IInputAddressValue;
