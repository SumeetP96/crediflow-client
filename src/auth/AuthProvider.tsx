import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { axiosGet } from '../api/request';
import { ApiRoutes } from '../api/routes';
import { QueryKeys } from '../api/types';
import LoaderFullscreen from '../components/loader-fullscreen/LoaderFullscreen';
import { authUserRefetchInterval, authUserStorageKey } from '../helpers/constants';
import { IAuthUser, IUser } from '../helpers/types';
import { AppRoute } from '../router/helpers';

export interface IAuthContextState {
  authUser: IAuthUser | null;
  redirectRoute: string;
}

export interface IAuthContextActions {
  updateAuthUser: (user: IUser) => void;
}

export type TAuthContext = IAuthContextState & IAuthContextActions;

export const AuthContext = createContext<TAuthContext | null>(null);

const transformUserToAuthUser = (user: IUser): IAuthUser => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
  };
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const storageUser = localStorage.getItem(authUserStorageKey)
    ? (JSON.parse(localStorage.getItem(authUserStorageKey) as string) as IAuthUser)
    : null;

  const [authUser, setAuthUser] = useState<IAuthUser | null>(storageUser);

  const query = useQuery({
    queryKey: [QueryKeys.AUTH_PROFILE],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUser>(ApiRoutes.AUTH_PROFILE, { signal });
    },
    retry: false,
    refetchInterval: authUserRefetchInterval,
  });

  const user = query.data?.data;

  useEffect(() => {
    if (query.isSuccess && user) {
      const transformed = transformUserToAuthUser(user);
      setAuthUser(transformed);
      localStorage.setItem(authUserStorageKey, JSON.stringify(transformed));
    }
    if (query.error) {
      const error = query.error as AxiosError;
      if (error.status === 401) {
        setAuthUser(null);
      }
    }
  }, [query.error, query.isSuccess, user]);

  const state: IAuthContextState = {
    authUser: user || authUser,
    redirectRoute: location.state?.prevLocation?.pathname || AppRoute('APP'),
  };

  const actions: IAuthContextActions = {
    updateAuthUser: (user: IUser) => {
      const transformed = transformUserToAuthUser(user);
      setAuthUser(transformed);
    },
  };

  if (query.isLoading) {
    return <LoaderFullscreen />;
  }

  return <AuthContext.Provider value={{ ...state, ...actions }}>{children}</AuthContext.Provider>;
}
