import { Add, FilterList } from '@mui/icons-material';
import { Box, Button, Collapse, Grid2, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { AppRoutes } from '../../router/routes';
import ListingApiErrorAlert from '../alerts/ListingApiErrorAlert';
import DataTableColumnSelect from '../data-table-column-select-menu/DataTableColumnSelectMenu';
import { IDataTableColumn } from '../data-table/DataTable';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';
import ListingSelectedFilters, {
  IListingSelectedFilter,
} from '../listing-selected-filters/ListingSelectedFilters';

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

  const { setSearchParams } = useQueryParams();

  const { search } = useCommonListingParams();

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h6" fontWeight={500} noWrap>
        {pageTitle}
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{ alignItems: 'end', mt: 2.5, mb: filters.length > 0 ? 0 : 0.5 }}
      >
        <Grid2 size={{ xs: 12, md: 4 }}>
          <DebouncedSearchField
            size="small"
            variant="outlined"
            placeholder="Search"
            debouncedTime={1000}
            minInputLength={3}
            value={search}
            disabled={isApiLoading}
            onChange={(search) => setSearchParams({ search })}
            sx={{ width: '100%' }}
          />
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
            <Button startIcon={<FilterList />} variant="outlined" disableElevation>
              Add Filter
            </Button>

            <DataTableColumnSelect
              columns={columns}
              onToggleColumn={onToggleColumn}
              selectedColumn={selectedColumns.map((col) => col.field)}
            />

            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => navigate(AppRoutes.USERS_CREATE)}
              disableElevation
            >
              New User
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <Collapse in={filters.length > 0}>
        <ListingSelectedFilters filters={filters} sx={{ mt: 2 }} />
      </Collapse>

      <ListingApiErrorAlert error={apiError} sx={{ mt: 2 }} />
    </Box>
  );
}
