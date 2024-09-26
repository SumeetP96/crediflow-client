import { TQueryParams } from '../../api/request';
import { TListingFilterValue } from '../types';

export const transformToApiQueryParamsObject = (obj: TQueryParams): TQueryParams => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        v != null &&
        (typeof v === 'string' ? v.trim().length > 0 : true) &&
        (Array.isArray(v) ? v.length > 0 : true),
    ),
  );
};

export const transformMultiSelectValue = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return '';
};

export const transformMultiSelectSelectedValue = (
  value: TListingFilterValue | TListingFilterValue[],
): TListingFilterValue[] | null => {
  if (typeof value === 'string') {
    return !value.length ? null : [value];
  }

  if (typeof value === 'boolean') {
    return [value];
  }

  return Array.isArray(value) ? value : [value];
};
