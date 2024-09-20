import { Alert, AlertTitle, Box, SxProps } from '@mui/material';
import { parseApiErrorResponse } from '../../api/response';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IListingApiErrorAlertProps {
  error: any;
  sx?: SxProps;
}

export default function ListingApiErrorAlert({ error, sx }: IListingApiErrorAlertProps) {
  const parsedError = error ? parseApiErrorResponse(error) : null;

  if (!parsedError) {
    return null;
  }

  return (
    <Box sx={sx}>
      <Alert severity="error">
        {parsedError.errors.length ? (
          <>
            <AlertTitle>Error: {parsedError.message}</AlertTitle>
            {parsedError.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </>
        ) : (
          parsedError.message
        )}
      </Alert>
    </Box>
  );
}
