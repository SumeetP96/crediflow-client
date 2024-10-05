import { useEffect, useMemo } from 'react';
import { IDataTableColumn } from '../../components/data-table/types';
import { TUserRecord } from '../../pages/users-listing/types';
import { EQueryParamKeys } from '../constants';
import useQueryParams from './use-query-params';

export default function useListingColumns<T>(columns: IDataTableColumn<T>[]) {
  const { getSingleSearchParam, setSearchParams } = useQueryParams();

  const selectedColumnFields: string[] = useMemo(() => {
    const colParam = getSingleSearchParam(EQueryParamKeys.COLS);
    if (!colParam) {
      return [];
    }
    if (typeof colParam === 'string') {
      return [colParam];
    }
    return colParam;
  }, [getSingleSearchParam]);

  useEffect(() => {
    if (!selectedColumnFields.length) {
      setSearchParams({
        [EQueryParamKeys.COLS]: columns
          .filter((col) => col.isHidden !== true)
          .map((col) => col.field),
      });
    }
  }, [columns, selectedColumnFields.length, setSearchParams]);

  const activeColumns = useMemo(
    () => columns.filter((col) => selectedColumnFields.includes(col.field as string)),
    [columns, selectedColumnFields],
  );

  const toggleColumn = (field: keyof TUserRecord) => {
    const isVisible = selectedColumnFields.includes(field);
    if (isVisible) {
      setSearchParams({ [EQueryParamKeys.COLS]: selectedColumnFields.filter((f) => f !== field) });
    } else {
      setSearchParams({ [EQueryParamKeys.COLS]: [...selectedColumnFields, field] });
    }
  };

  return {
    activeColumns,
    toggleColumn,
  };
}
