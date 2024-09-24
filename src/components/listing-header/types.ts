import { IDataTableFilter } from '../data-table/DataTable';

export type TSelectedOptionValue = string | number | boolean | TSelectedOptionValue[];

export interface ISelectedFilter<Col> extends IDataTableFilter {
  field: keyof Col;
  value: string;
}
