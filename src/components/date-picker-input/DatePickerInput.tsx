import { useMediaQuery, useTheme } from '@mui/material';
import {
  DatePicker,
  DateValidationError,
  MobileDatePicker,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export interface IDatePickerInputProps {
  value: Dayjs | null | undefined;
  onChange?:
    | ((value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void)
    | undefined;
}

export default function DatePickerInput({ value, onChange }: IDatePickerInputProps) {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const Picker = isTablet ? MobileDatePicker : DatePicker;

  return (
    <Picker
      autoFocus
      format="DD-MM-YYYY"
      value={value}
      onChange={onChange}
      sx={{
        width: '150px',
        '& .MuiOutlinedInput-input': {
          py: 1,
        },
      }}
    />
  );
}
