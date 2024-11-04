import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  EInvoiceRelation,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

type State = {
  customerOptions: TInvoiceCustomerOption[];
  agentOptions: TInvoiceAgentOption[];
  invoiceRelations: IInvoiceRelations;
};

type Actions = {
  setCustomerOptions: (options: TInvoiceCustomerOption[]) => void;
  setAgentOptions: (options: TInvoiceAgentOption[]) => void;
  addRelation: (type: EInvoiceRelation, index: number, id: number) => void;
  removeRelation: (type: EInvoiceRelation, id: number) => void;
  addEmptyRelation: (type: EInvoiceRelation) => void;
};

const emptyCustomerRelation: IInvoiceRelationValue = {
  id: 0,
  isPlaceholder: true,
};

const emptyAgentRelation: IInvoiceRelationValue = {
  id: 0,
  isPlaceholder: true,
};

export const useInvoiceFormStore = create<State & Actions>()(
  immer((set) => ({
    customerOptions: [],

    agentOptions: [],

    invoiceRelations: {
      customers: [emptyCustomerRelation],
      agents: [emptyAgentRelation],
    },

    setCustomerOptions: (options: TInvoiceCustomerOption[]) => set({ customerOptions: options }),

    setAgentOptions: (options: TInvoiceAgentOption[]) => set({ agentOptions: options }),

    addRelation: (type: EInvoiceRelation, index: number, id: number) =>
      set(({ invoiceRelations }) => {
        invoiceRelations[type][index].id = id;
        invoiceRelations[type][index].isPlaceholder = false;
      }),

    removeRelation: (type: EInvoiceRelation, id: number) =>
      set(({ invoiceRelations }) => {
        if (invoiceRelations[type].length === 1) {
          invoiceRelations[type][0].id = 0;
          invoiceRelations[type][0].isPlaceholder = true;
        } else {
          invoiceRelations[type] = invoiceRelations[type].filter((relation) => relation.id !== id);
        }
      }),

    addEmptyRelation: (type: EInvoiceRelation) =>
      set((state) => {
        if (type === EInvoiceRelation.CUSTOMERS) {
          state.invoiceRelations.customers.push({
            ...emptyCustomerRelation,
            id: Number((Math.random() * 1e5).toFixed(0)),
          });
        } else {
          state.invoiceRelations.agents.push({
            ...emptyAgentRelation,
            id: Number((Math.random() * 1e5).toFixed(0)),
          });
        }
      }),
  })),
);
