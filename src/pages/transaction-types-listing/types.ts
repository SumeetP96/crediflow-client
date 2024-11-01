import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon } from '../../helpers/types';

export type TTransactionTypeStatus = 'active' | 'in_active';

export type TTransactionTypeStatusSelectLabel = 'Active' | 'Inactive';

export interface ITransactionType extends IModelCommon {
  name: string;
  description: string;
  isDeduction: boolean;
  status: TTransactionTypeStatus;
}

export type TTransactionTypeRecord = ITransactionType & IDataTableExtraColumns;

export interface ITransactionTypeWithCount {
  count: number;
  rows: TTransactionTypeRecord[];
}
