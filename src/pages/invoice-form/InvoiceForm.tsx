import { Autocomplete, Divider, FormControl, Grid2, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { produce } from 'immer';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { axiosGet } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import MastersFormWrapper, {
  IMastersFormWrapperProps,
} from '../../components/masters-form-wrapper/MastersFormWrapper';
import { AppRoute } from '../../router/helpers';
import { IAgent } from '../agents-listing/types';
import { ICustomer } from '../customers-listing/types';
import { IInvoiceCategory } from '../invoice-categories-listing/types';
import { IInvoice } from '../invoices-listing/types';
import InvoiceItems from './InvoiceItems';
import InvoiceRelations from './InvoiceRelations';
import {
  EInvoiceRelation,
  IFormInvoice,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

const emptyCustomerRelation: IInvoiceRelationValue = {
  id: 0,
  isPlaceholder: true,
};

const emptyAgentRelation: IInvoiceRelationValue = {
  id: 0,
  isPlaceholder: true,
};

export default function InvoiceForm() {
  const formWrapperProps: IMastersFormWrapperProps<IInvoice, IFormInvoice> = {
    createTitle: 'Create New Invoice',
    updateTitle: 'Update Invoice',
    heading: 'Invoice Details',
    fallbackPrevRoute: AppRoute('INVOICES_LIST'),
    defaultValues: (invoice) => ({
      invoiceCategoryId: invoice?.invoiceCategoryId ?? 0,
      customerId: invoice?.customerId ?? 0,
      date: invoice?.date ?? '',
      invoiceNumber: invoice?.invoiceNumber ?? '',
      amount: invoice?.amount ?? 0,
      dueDate: invoice?.dueDate ?? '',
      remarks: invoice?.remarks ?? '',
    }),
    readRecord: {
      key: QueryKeys.INVOICES_BY_ID,
      apiRoute: (id) => ApiRoutes.INVOICES_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.INVOICES_CREATE,
      apiRoute: () => ApiRoutes.INVOICES_CREATE,
    },
    updateRecord: {
      key: QueryKeys.INVOICES_UPDATE,
      apiRoute: (id) => ApiRoutes.INVOICES_UPDATE(id),
    },
    apiSuccessMessage: (action) => {
      return `Invoice ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.INVOICES_LISTING],
  };

  const invoiceCategoriesQuery = useQuery({
    queryKey: [QueryKeys.INVOICE_CATEGORIES_OPTIONS],
    queryFn: async () => {
      return await axiosGet<IInvoiceCategory[]>(ApiRoutes.INVOICE_CATEGORIES_OPTIONS);
    },
    retry: false,
  });

  const customersQuery = useQuery({
    queryKey: [QueryKeys.CUSTOMERS_OPTIONS],
    queryFn: async () => {
      return await axiosGet<ICustomer[]>(ApiRoutes.CUSTOMER_OPTIONS);
    },
    retry: false,
  });

  const agentsQuery = useQuery({
    queryKey: [QueryKeys.AGENTS_OPTIONS],
    queryFn: async () => {
      return await axiosGet<IAgent[]>(ApiRoutes.AGENT_OPTIONS);
    },
    retry: false,
  });

  const invoiceCategoryOptions = useMemo(() => {
    const data = invoiceCategoriesQuery.data?.data ?? [];
    if (!data.length) return [];
    return data.map((category) => ({
      ...category,
      value: category.id,
      label: category.name,
    }));
  }, [invoiceCategoriesQuery.data?.data]);

  const customerOptions: TInvoiceCustomerOption[] = useMemo(() => {
    const data = customersQuery.data?.data ?? [];
    if (!data.length) return [];
    return data.map((customer) => ({
      ...customer,
      value: customer.id,
      label: customer.name,
    }));
  }, [customersQuery.data?.data]);

  const agentOptions: TInvoiceAgentOption[] = useMemo(() => {
    const data = agentsQuery.data?.data ?? [];
    if (!data.length) return [];
    return data.map((agent) => ({
      ...agent,
      value: agent.id,
      label: agent.name,
    }));
  }, [agentsQuery.data?.data]);

  const [invoiceRelations, setInvoiceRelations] = useState<IInvoiceRelations>({
    customers: [emptyCustomerRelation],
    agents: [emptyAgentRelation],
  });

  const addEmptyRelation = (type: EInvoiceRelation) => {
    setInvoiceRelations(
      produce((draft) => {
        draft[type].push(
          type === 'customers'
            ? { ...emptyCustomerRelation, id: Number((Math.random() * 1e5).toFixed(0)) }
            : { ...emptyAgentRelation, id: Number((Math.random() * 1e5).toFixed(0)) },
        );
      }),
    );
  };

  const addRelation = (type: EInvoiceRelation, index: number, id: number) => {
    setInvoiceRelations(
      produce((draft) => {
        draft[type][index].id = id;
        draft[type][index].isPlaceholder = false;
      }),
    );
  };

  const removeRelation = (type: EInvoiceRelation, id: number) => {
    setInvoiceRelations(
      produce((draft) => {
        if (draft[type].length === 1) {
          draft[type][0].id = 0;
          draft[type][0].isPlaceholder = true;
        } else {
          draft[type] = draft[type].filter((relation) => relation.id !== id);
        }
      }),
    );
  };

  return (
    <MastersFormWrapper
      {...formWrapperProps}
      spacing={3}
      paperSx={{
        width: { xs: '100%' },
      }}
    >
      {({ field: Field }) => (
        <>
          {/* Invoice Category */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="invoiceCategoryId"
              validators={{ onChange: z.number() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      id="invoiceCategoryId"
                      autoFocus
                      value={
                        invoiceCategoryOptions.find((opt) => opt.value === state.value) ?? null
                      }
                      options={invoiceCategoryOptions}
                      onChange={(_, selection) => handleChange(selection?.value as number)}
                      onBlur={handleBlur}
                      renderInput={(params) => <TextField {...params} label="Invoice category" />}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Invoice Number */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Field
              name="invoiceNumber"
              validators={{ onChange: z.string() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="invoiceNumber"
                      label="Invoice Number"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Invoice number"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Date */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Field
              name="date"
              validators={{ onChange: z.string() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="date"
                      label="Date"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter date"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Customer */}
          <Grid2 size={12}>
            <Field
              name="customerId"
              validators={{ onChange: z.number() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      id="customerId"
                      autoFocus
                      value={customerOptions.find((opt) => opt.value === state.value) ?? null}
                      options={customerOptions}
                      onChange={(_, selection) => handleChange(selection?.value as number)}
                      onBlur={handleBlur}
                      renderInput={(params) => <TextField {...params} label="Customer" />}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Invoice Items */}
          <Grid2 size={12}>
            <InvoiceItems />
          </Grid2>

          {/* Remarks */}
          <Grid2 size={12}>
            <Field
              name="remarks"
              validators={{ onChange: z.string().optional() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="remarks"
                      label="Remarks"
                      variant="outlined"
                      multiline
                      maxRows={3}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Remarks"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          <Grid2 size={12}>
            <Divider />
          </Grid2>

          <Grid2 size={12}>
            <InvoiceRelations
              customerOptions={customerOptions}
              agentOptions={agentOptions}
              invoiceRelations={invoiceRelations}
              onAddRelation={addRelation}
              onRemoveRelation={removeRelation}
              onAddEmptyRelation={addEmptyRelation}
            />
          </Grid2>
        </>
      )}
    </MastersFormWrapper>
  );
}
