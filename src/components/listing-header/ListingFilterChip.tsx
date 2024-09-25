import { Box, Chip, ClickAwayListener, Fade, Paper, Popper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { TMultiSelectOptionValue } from '../../helpers/types';
import { TDataTableFilterType } from '../data-table/DataTable';
import SelectTypeFilter from './SelectTypeFilter';
import TextTypeFilter from './TextTypeFilter';
import { ISelectedFilter } from './types';

export interface IListingFilterChipProps<Col> {
  filter: ISelectedFilter<Col>;
  isApiLoading: boolean;
  openFilterField?: keyof Col;
}

export default function ListingFilterChip<Col>({
  filter,
  isApiLoading = false,
  openFilterField,
}: IListingFilterChipProps<Col>) {
  console.log('🚀 ~ isApiLoading:', isApiLoading);

  const { getSearchParams, setSearchParams } = useQueryParams();

  const chipRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (chipRef.current && openFilterField === filter.field) {
        setAnchorEl(chipRef.current);
      }
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filter.field, openFilterField]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && Boolean(anchorEl)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);

  const allParams = getSearchParams();

  const fieldValue = (allParams[filter.field] as string) || '';

  const filterTypeProps = {
    filter: filter,
    value: fieldValue,
    onChange: (value: TMultiSelectOptionValue | TMultiSelectOptionValue[]) => {
      setSearchParams({ [filter.field]: value });
    },
  };

  const renderFilterByType = (type: TDataTableFilterType) => {
    switch (type) {
      case 'text':
        return <TextTypeFilter {...filterTypeProps} />;
      case 'select':
        return <SelectTypeFilter {...filterTypeProps} />;
      case 'multiselect':
        return <SelectTypeFilter {...filterTypeProps} multiple />;
      default:
        return null;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box component="div" sx={{ display: 'inline-block' }}>
        <Chip
          key={filter.field as string}
          color="secondary"
          component="div"
          ref={chipRef}
          label={
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                {filter.label as string}:
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mr: 0.25 }}>
                {filter.render ? filter.render(filter, filter.value) : filter.value}
              </Typography>
            </Box>
          }
          variant="outlined"
          size="medium"
          sx={{ borderStyle: 'dashed' }}
          onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
          onDelete={() => setSearchParams({ [filter.field as string]: null })}
        />

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          sx={{ zIndex: 1000 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={5}>{renderFilterByType(filter.type)}</Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
