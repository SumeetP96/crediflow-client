import { AddCircleOutline, FilterList, ViewWeekTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid2,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { EQueryParamKeys, IListingSelectedFilter } from '../../helpers/types';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import ApiErrorAlert from '../alerts/ApiErrorAlert';
import ButtonMenu from '../button-menu/ButtonMenu';
import { IDataTableColumn, IDataTableFilter } from '../data-table/types';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';
import ListingFilterChip from '../listing-filter-chip/ListingFilterChip';
import ListingFilterIcon from '../listing-filter-icon/ListingFilterIcon';

export interface IListingHeaderProps<Col> {
  pageTitle: string;
  isApiLoading: boolean;
  apiError: unknown;
  columns: Array<IDataTableColumn<Col>>;
  filters?: IDataTableFilter<Col>[];
  selectedColumns: Array<IDataTableColumn<Col>>;
  onToggleColumn: (field: keyof Col) => void;
  newRecordRoute: string;
}

export default function ListingHeader<Col>({
  pageTitle,
  isApiLoading,
  apiError,
  columns,
  filters,
  selectedColumns,
  onToggleColumn,
  newRecordRoute,
}: IListingHeaderProps<Col>) {
  const { navigateTo } = useNavigateTo();

  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useHotkeys(
    '/',
    () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    { preventDefault: true },
  );

  const [openFilterField, setOpenFilterField] = useState<keyof Col>();

  const { getSearchParams, setSearchParams } = useQueryParams();

  const allParams = getSearchParams();

  const selectableColumns = useMemo(() => {
    return columns.filter((col) => col.select !== false);
  }, [columns]);

  const availableFilters = useMemo(() => {
    let allFilters = columns
      .filter((col) => Boolean(col.filter?.type))
      .map((col) => {
        return {
          ...col.filter,
          field: col.field,
          title: col.title,
        } as IDataTableFilter<Col>;
      });

    if (filters?.length) {
      allFilters = allFilters.concat(filters);
    }

    return (allFilters || []) as IDataTableFilter<Col>[];
  }, [columns, filters]);

  const selectedFilters = useMemo(() => {
    const selected: IListingSelectedFilter<Col>[] = [];

    availableFilters
      .filter((f) => Object.keys(allParams).includes(f.field as string))
      .forEach((f) => {
        selected.push({
          ...f,
          field: f.field as keyof Col,
          title: f.title as string,
          value: allParams[f.field],
        });
      });

    return selected;
  }, [allParams, availableFilters]);

  const filterMenuOptions = useMemo(() => {
    return availableFilters.filter((col) => {
      return !selectedFilters.find((f) => f.field === col.field);
    });
  }, [availableFilters, selectedFilters]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid2
        container
        spacing={2}
        sx={{ mb: selectedFilters.length > 0 ? 0 : 0.5 }}
        alignItems="flex-start"
      >
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight={500} noWrap>
            {pageTitle}
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              mt: { xs: 1, md: 0 },
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              alignItems: { xs: 'flex-start', lg: 'center' },
              gap: 1.25,
            }}
          >
            <DebouncedSearchField
              ref={searchInputRef}
              size="small"
              variant="outlined"
              placeholder={`Press "/" to search`}
              debounceTime={1000}
              minInputLength={1}
              value={allParams.search ?? ''}
              onChange={(value) => setSearchParams({ [EQueryParamKeys.SEARCH]: value })}
              sx={{ width: { xs: '100%', md: '250px', lg: '300px' }, mb: { xs: 1, md: 0 } }}
            />

            <ButtonMenu
              label="Add Filters"
              tooltip="Add Filters to Table"
              icon={<FilterList />}
              isIconButton={isTablet}
            >
              {({ closeMenu }) => (
                <MenuList>
                  {filterMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.field as string}
                      onClick={() => {
                        setSearchParams({ [opt.field as string]: '' });
                        setOpenFilterField(opt.field);
                        closeMenu();
                      }}
                      sx={{ py: 1 }}
                    >
                      <ListItemIcon>
                        {opt.icon ? opt.icon : <ListingFilterIcon type={opt.type} />}
                      </ListItemIcon>
                      <ListItemText>{opt.title}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              )}
            </ButtonMenu>

            <ButtonMenu
              label="Columns"
              tooltip="Select Columns"
              icon={<ViewWeekTwoTone />}
              isIconButton={isTablet}
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

            <Tooltip title="Create a new record">
              <Button
                startIcon={<AddCircleOutline />}
                variant="contained"
                onClick={() => navigateTo(newRecordRoute)}
                disableElevation
                sx={{ flexGrow: { xs: 1, md: 0 } }}
              >
                Create New
              </Button>
            </Tooltip>
          </Box>
        </Grid2>
      </Grid2>

      <Collapse in={selectedFilters.length > 0}>
        <Box
          sx={{
            mt: { xs: 3, md: 2 },
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            gap: 1,
          }}
        >
          {selectedFilters.map((filter) => (
            <ListingFilterChip
              key={String(filter.field)}
              filter={filter}
              isApiLoading={isApiLoading}
              openFilterField={openFilterField}
            />
          ))}
        </Box>
      </Collapse>

      <Collapse in={Boolean(apiError)}>
        <ApiErrorAlert error={apiError} sx={{ mt: 2 }} />
      </Collapse>
    </Box>
  );
}
