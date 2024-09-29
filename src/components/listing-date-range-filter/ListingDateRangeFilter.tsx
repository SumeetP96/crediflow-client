import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateRange, DateRangeCalendar, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { IListingSelectedFilter, TListingFilterValue } from '../../helpers/types';

export interface IListingDateRangeFilter<Col> {
  filter: IListingSelectedFilter<Col>;
  value: string[];
  onChange: (value: TListingFilterValue[]) => void;
}

export default function ListingDateRangeFilter<Col>({
  filter,
  value,
  onChange,
}: IListingDateRangeFilter<Col>) {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const safeValue = value.filter(Boolean);

  const [range, setRange] = useState<DateRange<Dayjs> | undefined>(
    safeValue ? (safeValue.map((v) => dayjs(v)) as DateRange<Dayjs>) : undefined,
  );

  useEffect(() => {
    const divs = document.querySelectorAll('div');
    const targetDiv = Array.from(divs).find(
      (div) => div.innerText.includes('MUI X Missing license key') && div.children.length === 0,
    );
    if (targetDiv) {
      targetDiv.style.display = 'none';
    }
  }, []);

  const handleApply = () => {
    if (range?.length === 2) {
      onChange(range.map((d) => dayjs(d).format('YYYY-MM-DD')));
    }
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Box sx={{ px: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2">{filter.label} is in daterange:</Typography>

        <Button size="small" onClick={handleApply}>
          Apply
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Box sx={{ px: 2 }}>
          <SingleInputDateRangeField
            format="DD-MM-YYYY"
            value={range}
            onChange={setRange}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-input': {
                py: 1,
              },
            }}
          />
        </Box>

        <DateRangeCalendar
          value={range}
          onChange={setRange}
          calendars={isTablet ? 1 : 2}
          sx={{
            '& .MuiDayCalendar-slideTransition': {
              minHeight: '225px',
            },
          }}
        />
      </Box>
    </Box>
  );
}
