import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { axiosGet } from '../api/request';
import { ApiRoutes } from '../api/routes';
import { IUser } from '../helpers/types';
import { AppRoute } from '../router/helpers';

export interface IAuthError {
  status: number;
  message: string;
}

export interface IAuthContextState {
  authUser: IUser | null;
  authError: IAuthError | null;
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

  const [authError, setAuthError] = useState<IAuthError | null>(null);

  const query = useQuery({
    queryKey: ['auth-user'],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUser>(ApiRoutes.AUTH_PROFILE, { signal });
    },
    retry: false,
  });

  const getAuthError = useCallback((): IAuthError | null => {
    if (!query.error) {
      return null;
    }
    const error = query.error as AxiosError<{ message: string; statusCode: number }>;
    const { statusCode = 401, message = 'Something went wrong' } = error.response?.data || {};
    return { status: statusCode, message };
  }, [query.error]);

  useEffect(() => {
    if (query.isSuccess) {
      setAuthUser(query.data?.data);
      setAuthError(null);
    }
    if (query.error) {
      const error = getAuthError();
      if (error?.status === 401) {
        setAuthUser(null);
        setAuthError(error);
      } else {
        setAuthError(error);
      }
    }
  }, [getAuthError, query.data?.data, query.error, query.isSuccess]);

  const state: IAuthContextState = {
    authUser: query.data?.data || authUser,
    authError: authError || getAuthError(),
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
