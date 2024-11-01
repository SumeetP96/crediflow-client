import { IAgent, IAgentAddress, IAgentContactNumber, TAgentStatus } from '../agents-listing/types';

export type TAgentStatusSelectLabel = 'Active' | 'Inactive';

export interface IAgentStatusSelectOption {
  label: TAgentStatusSelectLabel;
  value: TAgentStatus;
}

export type TAgentOption = Pick<IAgent, 'id' | 'name'>;

export interface IFormAgent {
  parentId?: number | null;
  name: string;
  contactNumbers?: IAgentContactNumber[];
  addresses?: IAgentAddress[];
  status: TAgentStatus;
}
