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
    <Box sx={{ p: 3 }}>
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
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'space-between', md: 'flex-end' },
              alignItems: 'top',
              gap: 1.25,
            }}
          >
            <ButtonMenu
              label="Add Filters"
              tooltip="Add Filters to Table"
              icon={<FilterList />}
              isIconButton={false}
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
              startIcon={<AddCircleOutline />}
              variant="contained"
              onClick={() => navigate(AppRoute('USERS_CREATE'))}
              disableElevation
            >
              Create New
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <Collapse in={selectedFilters.length > 0}>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'start', gap: 1 }}>
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
