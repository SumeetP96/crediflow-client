import { Box, Chip, ClickAwayListener, Fade, Paper, Popper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { IDataTableFilter } from '../data-table/DataTable';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';

export interface ISelectedFilter<Col> extends IDataTableFilter {
  field: keyof Col;
  value: string;
}

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
                {filter.value}
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
              <Paper elevation={5}>
                {filter.type === 'text' ? (
                  <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                    <Typography variant="subtitle2">{filter.label} contains:</Typography>

                    <DebouncedSearchField
                      hasSearchIcon={false}
                      size="small"
                      autoFocus
                      variant="outlined"
                      placeholder={`Filter by ${filter.field as string}`}
                      debouncedTime={1000}
                      minInputLength={3}
                      value={fieldValue}
                      // disabled={isApiLoading}
                      onChange={(search) => setSearchParams({ [filter.field]: search })}
                      sx={{ width: '100%', mt: 1 }}
                    />
                  </Box>
                ) : null}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
