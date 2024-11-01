import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';

export default function UsersListing() {
  const { query, rows, totalRecords } = useUserListingData();

  const { columns } = useUserListingColumns();

  return (
    <MastersListingPage
      pageTitle="Users Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
