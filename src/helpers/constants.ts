import { TSortOrder } from './types';

export enum ELocalStorageKeys {
  AUTH_USER = 'user-details',
  THEME = 'mui-theme',
}

export const authUserRefetchInterval = 1000 * 60 * 30; // 30 minutes

export const breadcrumbRoutesId = 'breadcrumb-pages';

export const defaultQueryParamsArraySeparator = '|';

export const defaultPage = 1;

export const defaultPerPage = 5;

export const defaultPerPageOptions = [5, 10, 25, 50, 100];

export const defaultSortOrder: TSortOrder = 'none';

export const defaultDateValueFormat = 'YYYY-MM-DD';

export const defaultDateVisibleFormat = 'DD-MM-YYYY';
