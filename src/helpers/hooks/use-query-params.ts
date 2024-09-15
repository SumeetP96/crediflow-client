/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer';
import queryString from 'query-string';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { defaultQueryParamsArraySeparator } from '../constants';

export default function useQueryParams() {
  const location = useLocation();

  const navigate = useNavigate();

  const getSearchParams = useCallback(<T = any>() => {
    return queryString.parse(location.search, {
      parseBooleans: true,
      parseNumbers: true,
    }) as T;
  }, [location.search]);

  const replaceSearchParams = useCallback(
    (params: Record<string, any>) => {
      const newSearch = queryString.stringify(params, {
        arrayFormat: 'separator',
        arrayFormatSeparator: defaultQueryParamsArraySeparator,
        skipNull: true,
      });
      navigate({ search: newSearch }, { replace: true });
    },
    [navigate],
  );

  const setSearchParams = useCallback(
    <T = any>(params: Record<string, T>) => {
      const currentParams = getSearchParams();
      const updatedParams = produce(
        currentParams,
        (draft: Record<string, any>) => {
          Object.keys(params).forEach((key) => {
            draft[key] = params[key] as string;
          });
        },
      );
      replaceSearchParams(updatedParams);
    },
    [getSearchParams, replaceSearchParams],
  );

  return {
    getSearchParams,
    setSearchParams,
  };
}
