import {
  Autocomplete,
  Divider,
  FormControl,
  Grid2,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { axiosGet } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import FormLabel from '../../components/form-label/FormLabel';
import FormWrapper, { IFormWrapperProps } from '../../components/form-wrapper/FormWrapper';
import { defaultDateVisibleFormat } from '../../helpers/constants';
import { AppRoute } from '../../router/helpers';
import { IAgent } from '../agents-listing/types';
import { ICustomer } from '../customers-listing/types';
import { IInvoiceCategory } from '../invoice-categories-listing/types';
import { IInvoice } from '../invoices-listing/types';
import InvoiceItems from './components/InvoiceItems';
import InvoiceRelations from './components/InvoiceRelations';
import { useInvoiceFormStore } from './store';
import { EInvoiceRelation, IFormInvoice } from './types';

export default function InvoiceForm() {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const Picker = isTablet ? MobileDatePicker : DatePicker;

  const {
    customerOptions,
    setCustomerOptions,
    setAgentOptions,
    invoiceItems,
    invoiceRelations,
    discount,
    payment,
    errorMap,
  } = useInvoiceFormStore();

  const hasErrors = useMemo(() => {
    return Object.values(errorMap).some((error) => error);
  }, [errorMap]);

  const transformValues = (values: IFormInvoice) => {
    const items = invoiceItems.filter((item) => !!item.name);

    const customerRelationIds = invoiceRelations.customers
      .filter((relation) => !!relation.id)
      .map((relation) => relation.id);

    const agentRelationIds = invoiceRelations.agents
      .filter((relation) => !!relation.id)
      .map((relation) => relation.id);

    return {
      ...values,
      invoiceItems: items,
      agentRelationIds,
      customerRelationIds,
      discount: parseFloat(String(discount)),
      payment: parseFloat(String(payment)),
    };
  };

  const formWrapperProps: IFormWrapperProps<IInvoice, IFormInvoice> = {
    createTitle: 'Create New Invoice',
    updateTitle: 'Update Invoice',
    heading: 'Invoice Details',
    fallbackPrevRoute: AppRoute('INVOICES_LIST'),
    isSubmitDisabled: !hasErrors,
    defaultValues: (invoice) => ({
      invoiceCategoryId: invoice?.invoiceCategoryId ?? null,
      customerId: invoice?.customerId ?? null,
      date: invoice?.date ?? dayjs().format(defaultDateVisibleFormat),
      invoiceNumber: invoice?.invoiceNumber ?? null,
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
    transformValues,
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

  useEffect(() => {
    const data = customersQuery.data?.data ?? [];
    const options = data.map((customer) => ({
      ...customer,
      value: customer.id,
      label: customer.name,
    }));
    setCustomerOptions(options);
  }, [customersQuery.data?.data, setCustomerOptions]);

  useEffect(() => {
    const data = agentsQuery.data?.data ?? [];
    const options = data.map((agent) => ({
      ...agent,
      value: agent.id,
      label: agent.name,
    }));
    setAgentOptions(options);
  }, [agentsQuery.data?.data, setAgentOptions]);

  return (
    <FormWrapper
      {...formWrapperProps}
      spacing={3}
      paperSx={{
        width: { xs: '100%' },
      }}
    >
      {({ form }) => (
        <>
          {/* Invoice Category */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <form.Field
              name="invoiceCategoryId"
              validators={{ onChange: z.number({ message: 'Invoice category is required' }) }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      id="invoiceCategoryId"
                      handleHomeEndKeys
                      value={
                        invoiceCategoryOptions.find((opt) => opt.value === state.value) ?? null
                      }
                      options={invoiceCategoryOptions}
                      onChange={(_, selection) => handleChange(selection?.value as number)}
                      onBlur={handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoFocus
                          placeholder="Select invoice category"
                          label={<FormLabel label="Invoice Category" required />}
                          helperText={state.meta.errors.join(', ')}
                          error={Boolean(state.meta.errors.length)}
                        />
                      )}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Invoice Number */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <form.Field
              name="invoiceNumber"
              validators={{ onChange: z.string({ message: 'Invoice number is required' }) }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="invoiceNumber"
                      label={<FormLabel label="Invoice number" required />}
                      variant="outlined"
                      value={state.value ?? ''}
                      onChange={(e) => handleChange(e.target.value.toUpperCase())}
                      onBlur={handleBlur}
                      placeholder="Enter invoice number"
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
            <form.Field
              name="date"
              validators={{
                onChange: z
                  .string()
                  .refine(
                    (date) => dayjs(date, defaultDateVisibleFormat, true).isValid(),
                    `Date must be in ${defaultDateVisibleFormat} format`,
                  ),
              }}
              children={({ state, handleChange }) => {
                return (
                  <FormControl fullWidth>
                    <Picker
                      label={<FormLabel label="Invoice Date" required />}
                      format={defaultDateVisibleFormat}
                      value={dayjs(state.value)}
                      onChange={(value) =>
                        handleChange(value ? value.format(defaultDateVisibleFormat) : '')
                      }
                      slotProps={{ textField: { helperText: state.meta.errors.join(', ') } }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Customer */}
          <Grid2 size={12}>
            <form.Field
              name="customerId"
              validators={{ onChange: z.number({ message: 'Customer is required' }) }}
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select customer"
                          label={<FormLabel label="Customer" required />}
                          helperText={state.meta.errors.join(', ')}
                          error={Boolean(state.meta.errors.length)}
                        />
                      )}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Invoice Items with Gross Total */}
          <Grid2 size={12}>
            <Typography textTransform="uppercase" gutterBottom marginBottom={2} mt={2}>
              Items
            </Typography>

            <form.Subscribe
              selector={(state) => [
                state.values.invoiceCategoryId,
                state.values.invoiceNumber,
                state.values.customerId,
              ]}
              children={([invoiceCategoryId, invoiceNumber, customerId]) => (
                <InvoiceItems disabled={!(invoiceCategoryId && invoiceNumber && customerId)} />
              )}
            />
          </Grid2>

          {/* Invoice Relations */}
          <Grid2 size={12}>
            <Typography textTransform="uppercase" gutterBottom mt={2}>
              Relations (optional)
            </Typography>

            <form.Subscribe
              selector={(state) => [state.values.customerId]}
              children={([customerId]) => (
                <Grid2 container spacing={3}>
                  {/* Customer */}
                  <InvoiceRelations
                    disabled={!customerId}
                    type={EInvoiceRelation.CUSTOMERS}
                    inputLabel="Customer"
                    addButtonLabel="Add Customer"
                    addTooltip="Add customer relation to invoice"
                    removeTooltip="Remove customer relation from invoice"
                    placeholder="Select customer"
                    invoiceCustomerId={customerId ?? 0}
                  />

                  {/* Agent */}
                  <InvoiceRelations
                    disabled={!customerId}
                    type={EInvoiceRelation.AGENTS}
                    inputLabel="Agent"
                    addButtonLabel="Add Agent"
                    addTooltip="Add agent relation to invoice"
                    removeTooltip="Remove agent relation from invoice"
                    placeholder="Select agent"
                  />
                </Grid2>
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Divider />
          </Grid2>

          {/* Remarks */}
          <Grid2 size={12}>
            <form.Field
              name="remarks"
              validators={{ onChange: z.string().optional() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="remarks"
                      label={<FormLabel label="Invoice remarks" />}
                      variant="outlined"
                      multiline
                      rows={3}
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
        </>
      )}
    </FormWrapper>
  );
}
