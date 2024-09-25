import { IDataTableFilter } from '../data-table/DataTable';

export interface ISelectedFilter<Col> extends IDataTableFilter {
  field: keyof Col;
  value: string;
}
