import { TUserRole, TUserStatus } from '../../helpers/types';

export interface IFormUser {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  role?: TUserRole | string;
  status?: TUserStatus;
}
