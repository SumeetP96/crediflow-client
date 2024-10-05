import { Box, MenuItem, Select, SxProps, Typography } from '@mui/material';
import { defaultPerPageOptions } from '../../helpers/constants';

export interface IDataTableFooterPerPageSelectProps {
  disabled?: boolean;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
  sx?: SxProps;
}

export default function DataTableFooterPerPageSelect({
  disabled = false,
  perPage,
  onPerPageChange,
  perPageOptions = defaultPerPageOptions,
  sx,
}: IDataTableFooterPerPageSelectProps) {
  return (
    <Box display="flex" alignItems="center" sx={sx}>
      <Typography sx={{ mr: 1 }}>Per page:</Typography>

      <Select
        disabled={disabled}
        size="small"
        variant="outlined"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        {perPageOptions.map((opt) => (
          <MenuItem key={String(opt)} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
