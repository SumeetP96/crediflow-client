import { ERecordStatus } from '../../helpers/types';
import { IInputAddressValue, IInputContactNumberValue, TTextMultiInputErrorMap } from './types';

export const emptyInputContactNumberValue: IInputContactNumberValue = {
  index: 0,
  isManuallyAdded: false,
  errorMap: { status: '', number: '' } as TTextMultiInputErrorMap,
  number: '',
  isPrimary: true,
  status: ERecordStatus.ACTIVE,
};

export const emptyInputAddressValue: IInputAddressValue = {
  index: 0,
  isManuallyAdded: false,
  errorMap: { status: '', address: '' } as TTextMultiInputErrorMap,
  address: '',
  isPrimary: true,
  status: ERecordStatus.ACTIVE,
};
