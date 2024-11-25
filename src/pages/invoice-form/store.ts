import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  EInvoiceRelation,
  IInvoiceFormItem,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

type State = {
  errorMap: Record<string, string>;
  customerOptions: TInvoiceCustomerOption[];
  agentOptions: TInvoiceAgentOption[];
  invoiceRelations: IInvoiceRelations;
  invoiceItems: IInvoiceFormItem[];
  discount?: string;
  payment?: string;
};

type Actions = {
  setError: (key: string, value: string) => void;
  removeError: (key: string) => void;
  setCustomerOptions: (options: TInvoiceCustomerOption[]) => void;
  setAgentOptions: (options: TInvoiceAgentOption[]) => void;
  updateRelation: (type: EInvoiceRelation, index: number, id: number) => void;
  removeRelation: (type: EInvoiceRelation, uid: string) => void;
  addEmptyRelation: (type: EInvoiceRelation) => void;
  updateInvoiceItem: (index: number, field: keyof IInvoiceFormItem, value: string) => void;
  removeInvoiceItem: (uid: string) => void;
  addEmptyInvoiceItem: () => void;
  setDiscount: (amount: string) => void;
  setPayment: (amount: string) => void;
  resetState: () => void;
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

const defaultState: State = {
  errorMap: {},
  customerOptions: [],
  agentOptions: [],
  invoiceRelations: {
    customers: [emptyCustomerRelation],
    agents: [emptyAgentRelation],
  },
  invoiceItems: [emptyInvoiceItem],
  discount: '',
  payment: '',
};

export const useInvoiceFormStore = create<State & Actions>()(
  immer((set) => ({
    ...defaultState,

    setError: (key: string, value: string) =>
      set((state) => {
        state.errorMap[key] = value;
      }),

    removeError: (key: string) =>
      set((state) => {
        state.errorMap[key] = '';
      }),

    setCustomerOptions: (options: TInvoiceCustomerOption[]) => set({ customerOptions: options }),

    setAgentOptions: (options: TInvoiceAgentOption[]) => set({ agentOptions: options }),

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

    setDiscount: (amount: string) =>
      set((state) => {
        state.discount = amount;
      }),

    setPayment: (amount: string) =>
      set((state) => {
        state.payment = amount;
      }),

    resetState: () => set(defaultState),
  })),
);
