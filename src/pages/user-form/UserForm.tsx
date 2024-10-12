import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router';
import { z } from 'zod';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import MastersFormWrapper, {
  IMastersFormWrapperProps,
} from '../../components/masters-form-wrapper/MastersFormWrapper';
import { IUser, TUserRole, TUserStatus } from '../../helpers/types';
import { AppRoute } from '../../router/helpers';
import { userRoles, userStatus } from './constants';
import { IFormUser } from './types';
import { confirmPasswordSchema, passwordSchema } from './validations';

export default function UserForm() {
  const params = useParams();

  const id = params.id ? parseInt(params.id, 10) : undefined;

  const isUpdateMode = Boolean(id);

  const formWrapperProps: IMastersFormWrapperProps<IUser, IFormUser> = {
    createTitle: 'Create New User',
    updateTitle: 'Update User',
    heading: 'User Details',
    fallbackPrevRoute: AppRoute('USERS_LIST'),
    defaultValues: (user) => ({
      name: user?.name ?? '',
      username: user?.username ?? '',
      role: user?.role ?? '',
      status: user?.status ?? 'active',
      password: '',
      confirmPassword: '',
    }),
    readRecord: {
      key: QueryKeys.USERS_BY_ID,
      apiRoute: (id) => ApiRoutes.USER_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.USERS_CREATE,
      apiRoute: () => ApiRoutes.USER_CREATE,
    },
    updateRecord: {
      key: QueryKeys.USERS_UPDATE,
      apiRoute: (id) => ApiRoutes.USER_UPDATE(id),
    },
    deleteRecord: {
      key: QueryKeys.USERS_DELETE,
      apiRoute: (id) => ApiRoutes.USER_DELETE(id),
      dialogTitle: 'Delete User',
      dialogBody: 'Are you sure you want to delete this user?',
    },
    apiSuccessMessage: (action) => {
      return `User ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.USERS_LISTING],
  };

  return (
    <MastersFormWrapper {...formWrapperProps}>
      {(form, Field) => (
        <>
          {/* Name */}
          <Grid2 size={12}>
            <Field
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, 'Name should have atleast 2 characters')
                  .max(100, 'Name cannot exceed 100 characters'),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="name"
                      autoFocus
                      label="Name"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter name of user"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Username */}
          <Grid2 size={12}>
            <Field
              name="username"
              validators={{
                onChange: z
                  .string()
                  .min(4, 'Username should have atleast 4 characters')
                  .max(20, 'Username cannot exceed 20 characters'),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      autoComplete="off"
                      placeholder="Enter username for user"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Password */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="password"
              validators={{
                onChange: isUpdateMode ? passwordSchema(form).update : passwordSchema(form).create,
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter password"
                      error={Boolean(state.meta.errors.length)}
                      helperText={state.meta.errors.join(', ')}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Confirm Password */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="confirmPassword"
              validators={{
                onChange: isUpdateMode
                  ? confirmPasswordSchema(form).update
                  : confirmPasswordSchema(form).create,
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter password again"
                      error={Boolean(state.meta.errors.length)}
                      helperText={state.meta.errors.join(', ')}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Role */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="role"
              validators={{
                onChange: z.enum(['super_admin', 'admin', 'employee'], {
                  message: 'Invalid role. Expected "Super Admin", "Admin", or "Employee"',
                }),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      value={state.value}
                      label="Role"
                      onChange={(e) => handleChange(e.target.value as TUserRole)}
                      onBlur={handleBlur}
                    >
                      {userRoles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {state.meta.errors.length ? (
                      <FormHelperText>{state.meta.errors.join(', ')}</FormHelperText>
                    ) : null}
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Status */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="status"
              validators={{
                onChange: z.enum(['active', 'in_active'], {
                  message: 'Invalid status. Expected "Active" or "Inactive"',
                }),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="role">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={state.value}
                      label="Status"
                      onChange={(e) => handleChange(e.target.value as TUserStatus)}
                      onBlur={handleBlur}
                    >
                      {userStatus.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {state.meta.errors.length ? (
                      <FormHelperText>{state.meta.errors.join(', ')}</FormHelperText>
                    ) : null}
                  </FormControl>
                );
              }}
            />
          </Grid2>
        </>
      )}
    </MastersFormWrapper>
  );
}
