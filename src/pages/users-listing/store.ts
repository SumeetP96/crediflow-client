import { create } from 'zustand';
import { TUserRoleFilterValue, TUserStatusFilterValue } from './interfaces';

type TUserListingStore = {
  roles: TUserRoleFilterValue[];
  status: TUserStatusFilterValue;
  page: number;
  perPage: number;
  setRoles: (roles: TUserRoleFilterValue[] | string) => void;
  setStatus: (status: TUserStatusFilterValue) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
};

export const useUserListingStore = create<TUserListingStore>()((set) => ({
  roles: ['super_admin', 'admin', 'employee'],
  status: 'all',
  page: 0,
  perPage: 5,

  setRoles: (roles) =>
    set({
      roles:
        typeof roles === 'string'
          ? (roles.split(',') as TUserRoleFilterValue[])
          : roles,
    }),

  setStatus: (status) => set({ status: status }),

  setPage: (page) => set({ page: page }),

  setPerPage: (perPage) => set({ perPage: perPage }),
}));
