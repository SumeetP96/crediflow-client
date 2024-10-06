import { TSortOrder } from './types';

export const authUserRefetchInterval = 1000 * 60 * 30; // 30 minutes

export const breadcrumbRoutesId = 'breadcrumb-pages';

export const defaultQueryParamsArraySeparator = '|';

export const defaultPage = 1;

export const defaultPerPage = 5;

export const defaultPerPageOptions = [5, 10, 25, 50, 100];

export const defaultSortOrder: TSortOrder = 'none';

export const defaultDateValueFormat = 'YYYY-MM-DD';

export const defaultDateVisibleFormat = 'DD-MM-YYYY';

export enum ELocalStorageKeys {
  AUTH_USER = 'user-details',
  THEME = 'mui-theme',
  FONT = 'mui-font',
}

export enum EQueryParamKeys {
  // App
  SETTINGS_DRAWER = 'settingsDrawer',

  // Data Table
  IS_DENSE = 'isDense',
  COLS = 'cols',
  SEARCH = 'search',
  PAGE = 'page',
  PER_PAGE = 'perPage',
  SORT_BY = 'sortBy',
  SORT_ORDER = 'sortOrder',
}
