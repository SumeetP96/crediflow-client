import { Box, Typography } from '@mui/material';

export interface IFormLabelProps {
  label: string;
  required?: boolean;
  showOptional?: boolean;
}

export default function FormLabel({
  label,
  required = false,
  showOptional = false,
}: IFormLabelProps) {
  return (
    <Box display="inline-flex" gap={0.4}>
      {label}
      {required ? <Typography color="error">*</Typography> : null}
      {!required && showOptional ? <Typography>(optional)</Typography> : null}
    </Box>
  );
}
