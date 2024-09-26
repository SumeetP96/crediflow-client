import { TDataTableFilterType } from '../data-table/DataTable';
import { listingFilterIconMap } from './constants';

export interface IListingFilterIconProps {
  type: TDataTableFilterType;
}

export default function ListingFilterIcon({ type }: IListingFilterIconProps) {
  return listingFilterIconMap[type] ?? null;
}
