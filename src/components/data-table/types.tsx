import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

export type TDataTableFilterType =
  | 'number'
  | 'text-exact'
  | 'text-fuzzy'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'daterange';

export interface IDataTableFilterSelectOption {
  label: string | null;
  value: string | number;
  [key: string]: unknown;
}

export interface IDataTableFilter {
  type: TDataTableFilterType;
  label: string;
  icon?: ReactNode;
  selectOptions?: IDataTableFilterSelectOption[];
  render?: (filter: IDataTableFilter, value?: string | number) => string | number;
}

export interface IDataTableColumn<T> {
  field: keyof T;
  title: string;
  sx?: SxProps;
  render?: (params: T) => ReactNode;
  sort?: boolean;
  filter?: IDataTableFilter;
  select?: boolean;
}

export interface IDataTableExtraColumns {
  actions: string;
}
