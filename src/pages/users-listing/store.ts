import { create } from 'zustand';
import { TUserRoleFilterValue, TUserStatusFilterValue } from './interfaces';

type TUserListingStore = {
  roles: TUserRoleFilterValue[];
  status: TUserStatusFilterValue;
  updateRoles: (roles: TUserRoleFilterValue[] | string) => void;
  updateStatus: (status: TUserStatusFilterValue) => void;
};

export const useUserListingStore = create<TUserListingStore>()((set) => ({
  roles: ['super_admin', 'admin', 'employee'],

  status: 'all',

  updateRoles: (roles) =>
    set({
      roles:
        typeof roles === 'string'
          ? (roles.split(',') as TUserRoleFilterValue[])
          : roles,
    }),

  updateStatus: (status) => set({ status: status }),
}));
