import { TMultiSelectOptionValue } from '../types';

export const transformMultiSelectSelectedValue = (
  value: TMultiSelectOptionValue | TMultiSelectOptionValue[],
): TMultiSelectOptionValue[] | null => {
  const finalValue = (() => {
    if (typeof value === 'string') {
      return !value.length ? null : [value];
    }

    if (typeof value === 'boolean') {
      return [value];
    }

    return Array.isArray(value) ? value : [value];
  })();

  return finalValue;
};
