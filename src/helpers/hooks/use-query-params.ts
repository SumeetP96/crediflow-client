import { produce } from 'immer';
import LZString from 'lz-string';
import queryString from 'query-string';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { defaultQueryParamsArraySeparator } from '../constants';

export default function useQueryParams() {
  const location = useLocation();

  const { navigateTo } = useNavigateTo();

  const getSearchParams = useCallback(<T = any>() => {
    const compressed = queryString.parse(location.search);
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed.q as string);
    return queryString.parse(decompressed, {
      parseBooleans: true,
      parseNumbers: true,
      arrayFormat: 'separator',
      arrayFormatSeparator: defaultQueryParamsArraySeparator,
    }) as T;
  }, [location.search]);

  const replaceSearchParams = useCallback(
    (params: Record<string, any>) => {
      const newSearch = queryString.stringify(params, {
        arrayFormat: 'separator',
        arrayFormatSeparator: defaultQueryParamsArraySeparator,
        skipNull: true,
      });
      const compressed = LZString.compressToEncodedURIComponent(newSearch);
      navigateTo({ search: queryString.stringify({ q: compressed }) }, { replace: true });
    },
    [navigateTo],
  );

  const setSearchParams = useCallback(
    <T = any>(params: Record<string, T>) => {
      const currentParams = getSearchParams();
      const updatedParams = produce(currentParams, (draft: Record<string, any>) => {
        Object.keys(params).forEach((key) => {
          draft[key] = params[key] as string;
        });
      });
      replaceSearchParams(updatedParams);
    },
    [getSearchParams, replaceSearchParams],
  );

  return {
    getSearchParams,
    setSearchParams,
  };
}
