import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { defaultDateValueFormat, defaultDateVisibleFormat } from '../../helpers/constants';
import { IListingSelectedFilter, TListingFilterValue } from '../../helpers/types';

export interface IListingDateFilter<Col> {
  filter: IListingSelectedFilter<Col>;
  value: string;
  onChange: (value: TListingFilterValue) => void;
}

export default function ListingDateFilter<Col>({
  filter,
  value,
  onChange,
}: IListingDateFilter<Col>) {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(isTablet ? true : false);

  const [date, setDate] = useState<Dayjs | null>(value ? dayjs(value) : null);

  const handleApply = () => {
    if (date) {
      onChange(date.format(defaultDateValueFormat));
    }
  };

  const Picker = isTablet ? MobileDatePicker : DatePicker;

  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2">{filter.label} is:</Typography>

        <Button size="small" onClick={handleApply}>
          Apply
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Picker
          open={open}
          autoFocus
          format={defaultDateVisibleFormat}
          value={dayjs(value)}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={setDate}
          sx={{
            minWidth: '175px',
            '& .MuiOutlinedInput-input': {
              py: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
}
