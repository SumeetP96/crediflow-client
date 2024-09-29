import { useQuery } from '@tanstack/react-query';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { useLocation } from 'react-router';
import { axiosGet } from '../api/request';
import { ApiRoutes } from '../api/routes';
import { IUser } from '../helpers/types';
import { AppRoute } from '../router/helpers';

export interface IAuthContextState {
  authUser: IUser | null;
  redirectRoute: string;
}

export interface IAuthContextActions {
  setAuthUser: Dispatch<SetStateAction<IUser | null>>;
}

export type TAuthContext = IAuthContextState & IAuthContextActions;

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const [authUser, setAuthUser] = useState<IUser | null>(null);

  const query = useQuery({
    queryKey: ['auth-user'],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUser>(ApiRoutes.AUTH_PROFILE, { signal });
    },
    retry: 4,
    retryDelay: 2000,
  });

  const state: IAuthContextState = {
    authUser: query.data?.data || authUser,
    redirectRoute: location.state?.prevLocation?.pathname || AppRoute('APP'),
  };

  const actions: IAuthContextActions = {
    setAuthUser,
  };

  if (query.isLoading) {
    return null;
  }

  return <AuthContext.Provider value={{ ...state, ...actions }}>{children}</AuthContext.Provider>;
}
