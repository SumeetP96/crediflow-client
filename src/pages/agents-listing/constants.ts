import { IDataTableFilterSelectOption } from '../../components/data-table/types';
import { TAgentStatus, TAgentStatusLabel } from './types';

export const agentStatusOptions: IDataTableFilterSelectOption<TAgentStatusLabel, TAgentStatus>[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'in_active' },
];
