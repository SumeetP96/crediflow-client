import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  EInvoiceRelation,
  IInvoiceItem,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

type State = {
  customerOptions: TInvoiceCustomerOption[];
  agentOptions: TInvoiceAgentOption[];
  invoiceRelations: IInvoiceRelations;
  invoiceItems: IInvoiceItem[];
};

type Actions = {
  setCustomerOptions: (options: TInvoiceCustomerOption[]) => void;
  setAgentOptions: (options: TInvoiceAgentOption[]) => void;
  updateRelation: (type: EInvoiceRelation, index: number, id: number) => void;
  removeRelation: (type: EInvoiceRelation, uid: string) => void;
  addEmptyRelation: (type: EInvoiceRelation) => void;
  updateInvoiceItem: (index: number, field: keyof IInvoiceItem, value: string) => void;
  removeInvoiceItem: (uid: string) => void;
  addEmptyInvoiceItem: () => void;
};

const emptyCustomerRelation: IInvoiceRelationValue = {
  uid: nanoid(),
  id: 0,
  isPlaceholder: true,
};

const emptyAgentRelation: IInvoiceRelationValue = {
  uid: nanoid(),
  id: 0,
  isPlaceholder: true,
};

const emptyInvoiceItem: IInvoiceItem = {
  uid: nanoid(),
  name: '',
  quantity: 0,
  price: 0,
  amount: 0,
};

export const useInvoiceFormStore = create<State & Actions>()(
  immer((set) => ({
    customerOptions: [],

    setCustomerOptions: (options: TInvoiceCustomerOption[]) => set({ customerOptions: options }),

    agentOptions: [],

    setAgentOptions: (options: TInvoiceAgentOption[]) => set({ agentOptions: options }),

    invoiceRelations: {
      customers: [emptyCustomerRelation],
      agents: [emptyAgentRelation],
    },

    updateRelation: (type: EInvoiceRelation, index: number, id: number) =>
      set(({ invoiceRelations }) => {
        invoiceRelations[type][index].id = id;
        invoiceRelations[type][index].isPlaceholder = false;
      }),

    removeRelation: (type: EInvoiceRelation, uid: string) =>
      set(({ invoiceRelations }) => {
        if (invoiceRelations[type].length === 1) {
          invoiceRelations[type][0].id = 0;
          invoiceRelations[type][0].isPlaceholder = true;
        } else {
          invoiceRelations[type] = invoiceRelations[type].filter(
            (relation) => relation.uid !== uid,
          );
        }
      }),

    addEmptyRelation: (type: EInvoiceRelation) =>
      set((state) => {
        if (type === EInvoiceRelation.CUSTOMERS) {
          state.invoiceRelations.customers.push({ ...emptyCustomerRelation, uid: nanoid() });
        } else {
          state.invoiceRelations.agents.push({ ...emptyAgentRelation, uid: nanoid() });
        }
      }),

    invoiceItems: [emptyInvoiceItem],

    updateInvoiceItem: (index: number, field: keyof IInvoiceItem, value: string) =>
      set(({ invoiceItems }) => {
        (invoiceItems[index][field] as any) = String(value);
      }),

    removeInvoiceItem: (uid: string) =>
      set((state) => {
        if (state.invoiceItems.length === 1) {
          state.invoiceItems[0] = { ...emptyInvoiceItem, uid: nanoid() };
        } else {
          state.invoiceItems = state.invoiceItems.filter((i) => i.uid !== uid);
        }
      }),

    addEmptyInvoiceItem: () =>
      set((state) => {
        state.invoiceItems.push({ ...emptyInvoiceItem, uid: nanoid() });
      }),
  })),
);
