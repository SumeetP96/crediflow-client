import { TDataTableFilterType } from '../data-table/types';
import { listingFilterIconMap } from './constants';

export interface IListingFilterIconProps {
  type: TDataTableFilterType;
}

export default function ListingFilterIcon({ type }: IListingFilterIconProps) {
  return listingFilterIconMap[type] ?? null;
}
