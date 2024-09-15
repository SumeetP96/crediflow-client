import { TSortOrder } from './interfaces';

export const defaultQueryParamsArraySeparator = '|';

export const defaultPage = 0;

export const defaultPerPage = 5;

export const defaultPerPageOptions = [5, 10, 25, 50, 100];

export const sortOrders: Record<string, TSortOrder> = {
  asc: 'asc',
  desc: 'desc',
  none: 'none',
};

export const defaultSortOrder = sortOrders.none;
