import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { defaultQueryParamsArraySeparator } from '../../../helpers/constants';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { TUserRoleFilterValue, TUserStatusFilterValue } from '../interfaces';

interface ListingParams {
  roles: TUserRoleFilterValue[];
  status: TUserStatusFilterValue;
}

interface GetSerachParams extends Omit<ListingParams, 'roles'> {
  roles: string;
}

const defaultStatus: TUserStatusFilterValue = 'all';

const defaultRoles: TUserRoleFilterValue[] = [];

export default function useUserListingParams() {
  const { getSearchParams, setSearchParams } = useQueryParams();

  const [params, setParams] = useState<ListingParams>(() => {
    const { roles, status } = getSearchParams<GetSerachParams>();

    return {
      roles:
        (roles?.split(defaultQueryParamsArraySeparator) as TUserRoleFilterValue[]) || defaultRoles,
      status: status || defaultStatus,
    };
  });

  const updateParams = useCallback(() => {
    const { roles, status } = getSearchParams<GetSerachParams>();

    setParams(
      produce((draft) => {
        draft.roles =
          (roles?.split(defaultQueryParamsArraySeparator) as TUserRoleFilterValue[]) ||
          defaultRoles;
        draft.status = status || defaultStatus;
      }),
    );

    if (status === undefined) {
      setSearchParams({ status: defaultStatus });
    }
  }, [getSearchParams, setSearchParams]);

  useEffect(() => {
    updateParams();
  }, [updateParams]);

  return params;
}
