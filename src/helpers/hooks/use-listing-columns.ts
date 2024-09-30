import { useEffect, useMemo } from 'react';
import { IDataTableColumn } from '../../components/data-table/types';
import { TUserRecord } from '../../pages/users-listing/types';
import useQueryParams from './use-query-params';

export default function useListingColumns<T>(columns: IDataTableColumn<T>[]) {
  const { getSearchParams, setSearchParams } = useQueryParams();

  const allParams = getSearchParams();

  const selectedColumnFields: string[] = useMemo(() => {
    const colParam = allParams.cols;
    if (!colParam) {
      return [];
    }
    if (typeof colParam === 'string') {
      return [colParam];
    }
    return colParam;
  }, [allParams.cols]);

  useEffect(() => {
    if (!selectedColumnFields.length) {
      setSearchParams({
        cols: columns.filter((col) => col.isHidden !== true).map((col) => col.field),
      });
    }
  }, [columns, getSearchParams, selectedColumnFields.length, setSearchParams]);

  const activeColumns = useMemo(
    () => columns.filter((col) => selectedColumnFields.includes(col.field as string)),
    [columns, selectedColumnFields],
  );

  const toggleColumn = (field: keyof TUserRecord) => {
    const isVisible = selectedColumnFields.includes(field);
    if (isVisible) {
      setSearchParams({ cols: selectedColumnFields.filter((f) => f !== field) });
    } else {
      setSearchParams({ cols: [...selectedColumnFields, field] });
    }
  };

  return {
    activeColumns,
    toggleColumn,
  };
}
