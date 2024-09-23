import {
  Abc,
  Add,
  DateRangeOutlined,
  ExpandCircleDownOutlined,
  FilterList,
  FormatListBulleted,
  TodayOutlined,
  ViewWeekTwoTone,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  Collapse,
  Divider,
  Fade,
  Grid2,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { AppRoute } from '../../router/routes';
import ListingApiErrorAlert from '../alerts/ListingApiErrorAlert';
import ButtonMenu from '../button-menu/ButtonMenu';
import { IDataTableColumn, TDataTableFilterType } from '../data-table/DataTable';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';
import ListingSelectedFilters, {
  IListingSelectedFilter,
} from '../listing-selected-filters/ListingSelectedFilters';

const filterIconMap: Record<TDataTableFilterType, ReactNode> = {
  text: <Abc />,
  select: <ExpandCircleDownOutlined />,
  multiselect: <FormatListBulleted />,
  date: <TodayOutlined />,
  daterange: <DateRangeOutlined />,
};

export interface ISelectedFilter<Col> {
  field: keyof Col;
  label: string;
  value: string;
  type: TDataTableFilterType;
}

function FilterChip<Col>({
  filter,
  isApiLoading = false,
}: {
  filter: ISelectedFilter<Col>;
  isApiLoading: boolean;
}) {
  const { getSearchParams, setSearchParams } = useQueryParams();

  const chipRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chipRef.current) {
      setAnchorEl(chipRef.current);
    }
  }, []);

  const open = Boolean(anchorEl);

  const allParams = getSearchParams();

  const fieldValue = (allParams[filter.field] as string) || '';

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Box component="div" sx={{ display: 'inline-block' }}>
        <Chip
          key={filter.field as string}
          component="div"
          ref={chipRef}
          label={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                {filter.label as string} :
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {filter.value}
              </Typography>
            </Box>
          }
          variant="outlined"
          size="medium"
          onClick={(e) => setAnchorEl(!anchorEl ? e.currentTarget : null)}
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
                    <Typography variant="subtitle2">{filter.label} contains</Typography>

                    <DebouncedSearchField
                      hasSearchIcon={false}
                      size="small"
                      autoFocus
                      variant="outlined"
                      placeholder={`Filter by ${filter.field as string}`}
                      debouncedTime={1000}
                      minInputLength={3}
                      value={fieldValue}
                      disabled={isApiLoading}
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

export interface IListingHeaderProps<Col> {
  pageTitle: string;
  isApiLoading: boolean;
  apiError: unknown;
  columns: Array<IDataTableColumn<Col>>;
  selectedColumns: Array<IDataTableColumn<Col>>;
  onToggleColumn: (field: keyof Col) => void;
  filters: IListingSelectedFilter[];
}

export default function ListingHeader<Col>({
  pageTitle,
  isApiLoading,
  apiError,
  columns,
  selectedColumns,
  onToggleColumn,
  filters,
}: IListingHeaderProps<Col>) {
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilter<Col>[]>([]);

  const [filterMenuAnchor, setFilterMenuAnchor] = useState<HTMLElement | null>(null);

  const isFilterMenuOpen = Boolean(filterMenuAnchor);

  const selectableColumns = useMemo(() => columns.filter((col) => col.select !== false), [columns]);

  const filterableColumns = useMemo(
    () => columns.filter((col) => Boolean(col.filter?.type)),
    [columns],
  );

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Grid2 container spacing={2} sx={{ alignItems: 'end', mb: filters.length > 0 ? 0 : 0.5 }}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight={500} noWrap>
            {pageTitle}
          </Typography>
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 8 }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'space-between', md: 'flex-end' },
              alignItems: 'top',
              gap: 1.25,
            }}
          >
            <Tooltip title="Add Filters to Table">
              <Button
                color="primary"
                onClick={(event) => setFilterMenuAnchor(event.currentTarget)}
                variant="outlined"
                disableElevation
                startIcon={<FilterList />}
              >
                Add Filter
              </Button>
            </Tooltip>

            <Menu
              open={isFilterMenuOpen}
              onClose={() => setFilterMenuAnchor(null)}
              anchorEl={filterMenuAnchor}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: 600,
                    minWidth: '18ch',
                  },
                },
              }}
            >
              <MenuList>
                {filterableColumns.map((col) => (
                  <MenuItem
                    key={col.field as string}
                    onClick={() => {
                      if (col.filter) {
                        setSelectedFilters(
                          selectedFilters.concat({
                            field: col.field,
                            label: col.title,
                            value: '',
                            type: col.filter?.type,
                          }),
                        );
                      }
                      setFilterMenuAnchor(null);
                    }}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon>
                      {col.filter?.type
                        ? col.filter.icon
                          ? col.filter.icon
                          : filterIconMap[col.filter?.type]
                        : null}
                    </ListItemIcon>
                    <ListItemText>{col.title}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <ButtonMenu
              label="Columns"
              tooltip="Select Columns"
              icon={<ViewWeekTwoTone />}
              isIconButton={false}
            >
              <MenuList>
                {selectableColumns.map((col) => (
                  <MenuItem
                    key={col.field as string}
                    onClick={() => onToggleColumn(col.field)}
                    sx={{ py: 0 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        size="small"
                        checked={selectedColumns.map((c) => c.field).includes(col.field)}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText>{col.title}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </ButtonMenu>

            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => navigate(AppRoute('USERS_CREATE'))}
              disableElevation
            >
              Create New
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <Divider sx={{ mt: 2 }} />

      {selectedFilters.length ? (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'start', gap: 1 }}>
          {selectedFilters.map((filter) => (
            <FilterChip key={String(filter.field)} filter={filter} isApiLoading={isApiLoading} />
          ))}
        </Box>
      ) : null}

      <Collapse in={Boolean(filters.length)}>
        <ListingSelectedFilters filters={filters} sx={{ mt: 2 }} />
      </Collapse>

      <Collapse in={Boolean(apiError)}>
        <ListingApiErrorAlert error={apiError} sx={{ mt: 2 }} />
      </Collapse>
    </Box>
  );
}
