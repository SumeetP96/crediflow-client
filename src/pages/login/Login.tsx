import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ZodValidator, zodValidator } from '@tanstack/zod-form-adapter';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { z } from 'zod';
import { axiosPost } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import useAuth from '../../auth/use-auth';
import { IUser } from '../../helpers/types';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { IFormLogin } from './types';

export default function Login() {
  const { navigateTo } = useNavigateTo();

  const { redirectRoute, setAuthUser } = useAuth();

  const [serverError, setServerError] = useState('');

  const query = useMutation({
    mutationKey: ['user-login'],
    mutationFn: async (data: IFormLogin) => {
      return await axiosPost<IUser, IFormLogin>(ApiRoutes.AUTH_LOGIN, data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setServerError(error.response?.data.message ?? '');
    },
    onSuccess: ({ data }) => {
      setAuthUser(data);
      navigateTo(redirectRoute);
    },
  });

  const form = useForm<IFormLogin, ZodValidator>({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ value }) => query.mutate(value),
    validatorAdapter: zodValidator(),
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 20 }}>
      <Paper
        variant="outlined"
        sx={{ px: { xs: 3, md: 4 }, py: { xs: 5, md: 6 }, width: { xs: '100%', md: '400px' } }}
      >
        <Typography align="center" variant="h5">
          Welcome Back to {import.meta.env.VITE_APP_NAME}
        </Typography>

        <Typography variant="subtitle1" align="center" sx={{ mt: 3 }}>
          Login to your account
        </Typography>

        {serverError ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {serverError}
          </Alert>
        ) : null}

        <form onSubmit={handleFormSubmit}>
          {/* Username */}
          <Box sx={{ mt: 3 }}>
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
                      placeholder="Enter username"
                      autoComplete="off"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mt: 3 }}>
            <form.Field
              name="password"
              validators={{
                onChange: z
                  .string()
                  .min(4, 'Password should have atleast 6 characters')
                  .max(40, 'Password cannot exceed 40 characters'),
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
                      autoComplete="off"
                      placeholder="Enter password"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  size="large"
                  disabled={!canSubmit}
                  variant="contained"
                  type="submit"
                  disableElevation
                  fullWidth
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              )}
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
