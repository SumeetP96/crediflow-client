import { Alert, AlertTitle, Box } from '@mui/material';
import { parseApiErrorResponse } from '../../api/response';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IListingApiErrorAlertProps {
  error: any;
}

export default function ListingApiErrorAlert({ error }: IListingApiErrorAlertProps) {
  const parsedError = error ? parseApiErrorResponse(error) : null;

  if (!parsedError) {
    return null;
  }

  return (
    <Box sx={{ px: 3, pb: 2 }}>
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
