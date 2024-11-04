import ListingPage from '../../components/listing-page/ListingPage';
import { AppRoute } from '../../router/helpers';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';

export default function UsersListing() {
  const { query, rows, totalRecords } = useUserListingData();

  const { columns } = useUserListingColumns();

  return (
    <ListingPage
      pageTitle="Users Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
      newRecordRoute={AppRoute('USERS_CREATE')}
    />
  );
}
