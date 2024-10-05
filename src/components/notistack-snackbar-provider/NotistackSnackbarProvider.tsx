import { styled } from '@mui/material';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

export interface INotistackSnackbarProvider {
  children: ReactNode;
}

const StyledSnackbar = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
}));

export default function NotistackSnackbarProvider({ children }: INotistackSnackbarProvider) {
  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        success: StyledSnackbar,
        error: StyledSnackbar,
        warning: StyledSnackbar,
        info: StyledSnackbar,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
