import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  EInvoiceRelation,
  IInvoiceFormItem,
  IInvoicePayment,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

type State = {
  customerOptions: TInvoiceCustomerOption[];
  agentOptions: TInvoiceAgentOption[];
  invoiceRelations: IInvoiceRelations;
  invoiceItems: IInvoiceFormItem[];
  invoicePayments: IInvoicePayment[];
};

type Actions = {
  setCustomerOptions: (options: TInvoiceCustomerOption[]) => void;
  setAgentOptions: (options: TInvoiceAgentOption[]) => void;
  updateRelation: (type: EInvoiceRelation, index: number, id: number) => void;
  removeRelation: (type: EInvoiceRelation, uid: string) => void;
  addEmptyRelation: (type: EInvoiceRelation) => void;
  updateInvoiceItem: (index: number, field: keyof IInvoiceFormItem, value: string) => void;
  removeInvoiceItem: (uid: string) => void;
  addEmptyInvoiceItem: () => void;
  updateInvoicePayment: (index: number, field: keyof IInvoicePayment, value: string) => void;
  removeInvoicePayment: (uid: string) => void;
  addEmptyInvoicePayment: () => void;
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

const emptyInvoiceItem: IInvoiceFormItem = {
  uid: nanoid(),
  name: '',
  quantity: 0,
  price: 0,
  amount: 0,
};

const emptyInvoicePayment: IInvoicePayment = {
  uid: nanoid(),
  remarks: '',
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

    updateInvoiceItem: (index: number, field: keyof IInvoiceFormItem, value: string) =>
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

    invoicePayments: [emptyInvoicePayment],

    updateInvoicePayment: (index: number, field: keyof IInvoicePayment, value: string) =>
      set(({ invoicePayments }) => {
        (invoicePayments[index][field] as any) = String(value);
      }),

    removeInvoicePayment: (uid: string) =>
      set((state) => {
        if (state.invoicePayments.length === 1) {
          state.invoicePayments[0] = { ...emptyInvoicePayment, uid: nanoid() };
        } else {
          state.invoicePayments = state.invoicePayments.filter((i) => i.uid !== uid);
        }
      }),

    addEmptyInvoicePayment: () =>
      set((state) => {
        state.invoicePayments.push({ ...emptyInvoicePayment, uid: nanoid() });
      }),
  })),
);
