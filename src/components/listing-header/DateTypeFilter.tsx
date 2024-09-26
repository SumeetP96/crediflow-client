import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { TMultiSelectOptionValue } from '../../helpers/types';
import DatePickerInput from '../date-picker-input/DatePickerInput';
import { ISelectedFilter } from './types';

export interface IDateTypeFilter<Col> {
  filter: ISelectedFilter<Col>;
  value: string;
  onChange: (value: TMultiSelectOptionValue) => void;
}

export default function DateTypeFilter<Col>({ filter, value, onChange }: IDateTypeFilter<Col>) {
  const handleChange = (value: Dayjs | null) => {
    const newValue = value ? dayjs(value).format('YYYY-MM-DD') : '';
    onChange(newValue);
  };

  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Typography variant="subtitle2">{filter.label} is:</Typography>

      <Box sx={{ mt: 1 }}>
        <DatePickerInput value={dayjs(value)} onChange={(value) => handleChange(value)} />
      </Box>
    </Box>
  );
}
