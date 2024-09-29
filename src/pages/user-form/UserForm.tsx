import { Block, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ZodValidator, zodValidator } from '@tanstack/zod-form-adapter';
import { AxiosError } from 'axios';
import { useParams } from 'react-router';
import { z } from 'zod';
import { axiosGet, axiosPatch, axiosPost } from '../../api/request';
import { parseApiErrorResponse } from '../../api/response';
import { ApiRoutes } from '../../api/routes';
import ApiErrorAlert from '../../components/alerts/ApiErrorAlert';
import Page from '../../components/page/Page';
import { IUser, TUserRole, TUserStatus } from '../../helpers/types';
import { setFormFieldErrors } from '../../helpers/utils/tanstack-form';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../router/helpers';
import { userRoles, userStatus } from './constants';
import { IFormUser } from './types';
import { confirmPasswordSchema, passwordSchema } from './validations';

export default function UserForm() {
  const { navigateToPrev } = useNavigateTo(AppRoute('USERS_LIST'));

  const params = useParams();

  const id = params.id ? parseInt(params.id, 10) : undefined;

  const isUpdateMode = Boolean(id);

  const findQuery = useQuery({
    queryKey: ['USER_BY_ID'],
    queryFn: async () => {
      return await axiosGet<IUser>(ApiRoutes.USER_BY_ID(id!));
    },
    enabled: isUpdateMode,
    retry: false,
  });

  const user = findQuery.data?.data;

  const form = useForm<IFormUser, ZodValidator>({
    defaultValues: {
      name: user?.name ?? '',
      username: user?.username ?? '',
      role: user?.role ?? '',
      status: user?.status ?? 'active',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      if (isUpdateMode) {
        updateQuery.mutate(value);
      } else {
        createQuery.mutate(value);
      }
    },
    validatorAdapter: zodValidator(),
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleApiSuccess = () => {
    navigateToPrev();
  };

  const handleApiError = (error: AxiosError) => {
    const { fieldErrors = [] } = parseApiErrorResponse(error);
    setFormFieldErrors(form, fieldErrors);
  };

  const createQuery = useMutation({
    mutationKey: ['user-create'],
    mutationFn: async (data: IFormUser) => {
      return await axiosPost(ApiRoutes.USER_CREATE, data);
    },
    onSuccess: handleApiSuccess,
    onError: handleApiError,
  });

  const updateQuery = useMutation({
    mutationKey: ['user-update'],
    mutationFn: async (data: IFormUser) => {
      return await axiosPatch(ApiRoutes.USER_UPDATE(id as number), data);
    },
    onSuccess: handleApiSuccess,
    onError: handleApiError,
  });

  const apiError = findQuery.error || createQuery.error || updateQuery.error;

  return (
    <Page title={isUpdateMode ? 'Update User' : 'Create New User'}>
      <Paper sx={{ p: 3, width: { xs: '100%', md: '860px' }, mx: 'auto' }} variant="outlined">
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={400} sx={{ mb: 2 }}>
              User Details
            </Typography>

            <Divider />
          </Box>

          {apiError ? <ApiErrorAlert error={apiError} sx={{ mb: 3 }} /> : null}

          <Grid2 container spacing={3}>
            {/* Name */}
            <Grid2 size={12}>
              <form.Field
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
              <form.Field
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
              <form.Field
                name="password"
                validators={{
                  onChange: isUpdateMode
                    ? passwordSchema(form).update
                    : passwordSchema(form).create,
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
              <form.Field
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
              <form.Field
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
              <form.Field
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
          </Grid2>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                  flexDirection: 'row-reverse',
                }}
              >
                <Button
                  disabled={!canSubmit}
                  variant="contained"
                  type="submit"
                  disableElevation
                  startIcon={<Save />}
                >
                  {isSubmitting
                    ? isUpdateMode
                      ? 'Updating...'
                      : 'Creating...'
                    : isUpdateMode
                      ? 'Update'
                      : 'Create'}
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  type="reset"
                  startIcon={<Block />}
                  onClick={() => {
                    form.reset();
                    navigateToPrev();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          />
        </form>
      </Paper>
    </Page>
  );
}
