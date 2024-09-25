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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { AppRoute } from '../../router/routes';
import ListingApiErrorAlert from '../alerts/ListingApiErrorAlert';
import ButtonMenu from '../button-menu/ButtonMenu';
import { IDataTableColumn } from '../data-table/DataTable';
import { filterIconMap } from './constants';
import ListingFilterChip from './ListingFilterChip';
import { ISelectedFilter } from './types';

export interface IListingHeaderProps<Col> {
  pageTitle: string;
  isApiLoading: boolean;
  apiError: unknown;
  columns: Array<IDataTableColumn<Col>>;
  selectedColumns: Array<IDataTableColumn<Col>>;
  onToggleColumn: (field: keyof Col) => void;
}

export default function ListingHeader<Col>({
  pageTitle,
  isApiLoading,
  apiError,
  columns,
  selectedColumns,
  onToggleColumn,
}: IListingHeaderProps<Col>) {
  const navigate = useNavigate();

  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  console.log('🚀 ~ isTablet:', isTablet);

  const [openFilterField, setOpenFilterField] = useState<keyof Col>();

  const { getSearchParams, setSearchParams } = useQueryParams();

  const allParams = getSearchParams();

  const selectableColumns = useMemo(() => {
    return columns.filter((col) => col.select !== false);
  }, [columns]);

  const filterableColumns = useMemo(() => {
    return columns.filter((col) => Boolean(col.filter?.type));
  }, [columns]);

  const selectedFilters = useMemo(() => {
    const selected: ISelectedFilter<Col>[] = [];

    filterableColumns
      .filter((col) => Object.keys(allParams).includes(col.field as string))
      .forEach((col) => {
        if (col.filter) {
          selected.push({
            ...col.filter,
            field: col.field,
            value: allParams[col.field],
          });
        }
      });

    return selected;
  }, [allParams, filterableColumns]);

  const filterMenuOptions = useMemo(() => {
    return filterableColumns.filter((col) => {
      return !selectedFilters.find((f) => f.field === col.field);
    });
  }, [filterableColumns, selectedFilters]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid2
        container
        spacing={2}
        sx={{ alignItems: 'end', mb: selectedFilters.length > 0 ? 0 : 0.5 }}
      >
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
              mt: { xs: 1, md: 0 },
              width: '100%',
              display: 'flex',
              flexWrap: { xs: 'no-wrap', md: 'wrap' },
              flexDirection: 'row',
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              alignItems: 'top',
              gap: 1.25,
            }}
          >
            <ButtonMenu
              label="Add Filters"
              tooltip="Add Filters to Table"
              icon={<FilterList />}
              isIconButton={!isTablet}
            >
              {({ closeMenu }) => (
                <MenuList>
                  {filterMenuOptions.map((col) => (
                    <MenuItem
                      key={col.field as string}
                      onClick={() => {
                        setSearchParams({ [col.field]: '' });
                        setOpenFilterField(col.field);
                        closeMenu();
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
              )}
            </ButtonMenu>

            <ButtonMenu
              label="Columns"
              tooltip="Select Columns"
              icon={<ViewWeekTwoTone />}
              isIconButton={!isTablet}
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
              startIcon={<AddCircleOutline />}
              variant="contained"
              onClick={() => navigate(AppRoute('USERS_CREATE'))}
              disableElevation
              sx={{ width: { xs: '100%', sm: 'unset' } }}
            >
              Create New
            </Button>
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
        <ListingApiErrorAlert error={apiError} sx={{ mt: 2 }} />
      </Collapse>
    </Box>
  );
}
