import { IDataTableExtraColumns } from '../../components/data-table/types';
import { IModelCommon } from '../../helpers/types';

export enum EAgentContactNumberStatus {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}

export interface IAgentContactNumber {
  number?: string;
  status?: EAgentContactNumberStatus;
  isPrimary?: boolean;
}

export enum EAgentAddressStatus {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
}

export interface IAgentAddress {
  address?: string;
  status?: EAgentAddressStatus;
  isPrimary?: boolean;
}

export type TAgentStatus = 'active' | 'in_active';

export interface IAgent extends IModelCommon {
  parentId: number;
  name: string;
  contactNumbers: IAgentContactNumber[];
  addresses: IAgentAddress[];
  status: TAgentStatus;
  parent: IAgent;
}

export interface IAgentListingAdditionalFilters {
  isDeletedShown?: boolean;
}

export type TAgentRecord = IAgent & IDataTableExtraColumns & IAgentListingAdditionalFilters;

export interface IAgentWithCount {
  count: number;
  rows: TAgentRecord[];
}
