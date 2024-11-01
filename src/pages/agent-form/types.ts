import { IAgent, IAgentAddress, IAgentContactNumber, TAgentStatus } from '../agents-listing/types';

export type TAgentOption = Pick<IAgent, 'id' | 'name'>;

export interface IFormAgent {
  parentId?: number | null;
  name: string;
  contactNumbers?: IAgentContactNumber[];
  addresses?: IAgentAddress[];
  status: TAgentStatus;
}
