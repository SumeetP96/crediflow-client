import { IDataTableColumn, IDataTableExtraColumns } from '../../components/data-table/DataTable';
import { IUser } from '../../helpers/types';

export type TUserRecord = IUser & IDataTableExtraColumns;

export type TUserColumns = IDataTableColumn<TUserRecord>[];

export interface IUsersWithCount {
  count: number;
  rows: TUserRecord[];
}
