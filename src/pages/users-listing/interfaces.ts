import { IDataTableColumn, IDataTableExtraColumns } from '../../components/data-table/DataTable';
import { IUser, TUserRole, TUserStatus } from '../../helpers/interfaces';

export type TUserRecord = IUser & IDataTableExtraColumns;

export type TUserColumns = IDataTableColumn<TUserRecord>[];

export interface IUsersWithCount {
  count: number;
  rows: TUserRecord[];
}

export type TUserRoleFilterValue = TUserRole;

export type TUserRoleFilterLabel = 'Super Admin' | 'Admin' | 'Employee';

export interface IUserRoleFilterOption {
  label: TUserRoleFilterLabel;
  value: TUserRoleFilterValue;
}

export type TUserStatusFilterValue = 'all' | TUserStatus;

export type TUserStatusFilterLabel = 'All' | 'Active' | 'Inactive';

export interface IUserStatusFilterOption {
  label: TUserStatusFilterLabel;
  value: TUserStatusFilterValue;
}
