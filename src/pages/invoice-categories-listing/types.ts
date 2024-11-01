import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon } from '../../helpers/types';

export type TInvoiceCategoryeStatus = 'active' | 'in_active';

export type TInvoiceCategoryeStatusLabel = 'Active' | 'Inactive';

export interface IInvoiceCategory extends IModelCommon {
  name: string;
  prefix: string | null;
  suffix: string | null;
  description: string | null;
  isAutoIncrement: boolean;
  nextNumber: number;
  status: TInvoiceCategoryeStatus;
}

export type TInvoiceCategoryRecord = IInvoiceCategory & IDataTableExtraColumns;

export interface IInvoiceCategoryWithCount {
  count: number;
  rows: TInvoiceCategoryRecord[];
}
