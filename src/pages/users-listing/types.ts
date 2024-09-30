import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IUser } from '../../helpers/types';

export interface IUserListingAdditionalFilters {
  isDeletedShown?: boolean;
}

export type TUserRecord = IUser & IDataTableExtraColumns & IUserListingAdditionalFilters;

export interface IUsersWithCount {
  count: number;
  rows: TUserRecord[];
}
