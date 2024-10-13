import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { z } from 'zod';
import { axiosGet } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import MastersFormWrapper, {
  IMastersFormWrapperProps,
} from '../../components/masters-form-wrapper/MastersFormWrapper';
import TextMultiInput from '../../components/text-multi-input/TextMultiInput';
import { TUserStatus } from '../../helpers/types';
import { yesNoOptions } from '../../helpers/utils/data-table';
import { AppRoute } from '../../router/helpers';
import { ICustomer } from '../customers-listing/types';
import { customerStatusOptions } from './constants';
import { IFormCustomer, TCustomerOption } from './types';

export default function CustomerForm() {
  const formWrapperProps: IMastersFormWrapperProps<ICustomer, IFormCustomer> = {
    createTitle: 'Create New Customer',
    updateTitle: 'Update Customer',
    heading: 'Customer Details',
    fallbackPrevRoute: AppRoute('CUSTOMERS_LIST'),
    defaultValues: (customer) => ({
      parentId: customer?.parentId ?? null,
      name: customer?.name ?? '',
      contactNumbers: customer?.contactNumbers ?? [],
      addresses: customer?.addresses ?? [],
      isReseller: customer?.isReseller ?? false,
      openingBalance: customer?.openingBalance ?? undefined,
      status: customer?.status ?? 'active',
    }),
    readRecord: {
      key: QueryKeys.CUSTOMERS_BY_ID,
      apiRoute: (id) => ApiRoutes.CUSTOMER_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.CUSTOMERS_CREATE,
      apiRoute: () => ApiRoutes.CUSTOMER_CREATE,
    },
    updateRecord: {
      key: QueryKeys.CUSTOMERS_UPDATE,
      apiRoute: (id) => ApiRoutes.CUSTOMER_UPDATE(id),
    },
    deleteRecord: {
      key: QueryKeys.CUSTOMERS_DELETE,
      apiRoute: (id) => ApiRoutes.CUSTOMER_DELETE(id),
      dialogTitle: 'Delete Customer',
      dialogBody: 'Are you sure you want to delete this customer?',
    },
    apiSuccessMessage: (action) => {
      return `Customer ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.CUSTOMERS_LISTING],
  };

  const optionsQuery = useQuery({
    queryKey: [QueryKeys.CUSTOMERS_OPTIONS],
    queryFn: () => axiosGet<TCustomerOption[]>(ApiRoutes.CUSTOMER_OPTIONS),
    retry: false,
  });

  const optionsData = optionsQuery.data?.data;

  const customerOptions = useMemo(() => {
    return optionsData
      ? optionsData.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      : [];
  }, [optionsData]);

  return (
    <MastersFormWrapper {...formWrapperProps} spacing={4}>
      {(_, Field) => (
        <>
          {/* Name */}
          <Grid2 size={12}>
            <Field
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, 'Name should have atleast 2 characters')
                  .max(100, 'Name cannot exceed 100 characters'),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="name"
                      autoFocus
                      label="Name"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter name of customer"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Contact Numbers */}
          <Grid2 size={12}>
            <Field
              name="contactNumbers"
              validators={{
                onChange: z
                  .array(
                    z
                      .string()
                      .min(8, 'One or more fields have errors')
                      .max(10, 'One or more fields have errors'),
                  )
                  .optional(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <TextMultiInput
                    girdSize={{ xs: 12, md: 6 }}
                    forceTrim
                    validationSchema={z
                      .string()
                      .min(8, 'Enter atleast 8 digits')
                      .max(10, 'Cannot exceed 10 digits')
                      .optional()}
                    title="Contact Numbers"
                    addButtonTooltip="Add contact number"
                    value={state.value}
                    onChange={handleChange}
                    errors={state.meta.errors}
                    textFieldProps={{
                      onBlur: handleBlur,
                      id: 'contactNumbers',
                      variant: 'outlined',
                      placeholder: 'Enter contact number',
                    }}
                  />
                );
              }}
            />
          </Grid2>

          {/* Addresses */}
          <Grid2 size={12}>
            <Field
              name="addresses"
              validators={{
                onChange: z.array(z.string()).optional(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <TextMultiInput
                    value={state.value}
                    onChange={(values) => handleChange(values.filter(Boolean))}
                    addButtonTooltip="Add address"
                    validationSchema={z.string().optional()}
                    title="Addresses"
                    errors={state.meta.errors}
                    textFieldProps={{
                      onBlur: handleBlur,
                      multiline: true,
                      maxRows: 3,
                      id: 'addresses',
                      variant: 'outlined',
                      placeholder: 'Enter address',
                    }}
                  />
                );
              }}
            />
          </Grid2>

          {/* Is Reseller */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="isReseller"
              validators={{
                onChange: z.boolean(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="role">Is Reseller</InputLabel>
                    <Select
                      labelId="isReseller"
                      id="isReseller"
                      value={state.value === true ? 'yes' : 'no'}
                      label="Is Reseller"
                      onChange={(e) => handleChange(e.target.value === 'yes')}
                      onBlur={handleBlur}
                    >
                      {yesNoOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {state.meta.errors.length ? (
                      <FormHelperText>{state.meta.errors.join(', ')}</FormHelperText>
                    ) : null}
                  </FormControl>
                );
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="status"
              validators={{
                onChange: z.enum(['active', 'in_active'], {
                  message: 'Invalid status. Expected "Active" or "Inactive"',
                }),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="role">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={state.value}
                      label="Status"
                      onChange={(e) => handleChange(e.target.value as TUserStatus)}
                      onBlur={handleBlur}
                    >
                      {customerStatusOptions.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {state.meta.errors.length ? (
                      <FormHelperText>{state.meta.errors.join(', ')}</FormHelperText>
                    ) : null}
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Opening Balance */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="openingBalance"
              validators={{ onChange: z.number().optional() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="openingBalance"
                      type="number"
                      label="Opening Balance"
                      variant="outlined"
                      value={state.value ?? ''}
                      onChange={(e) => {
                        const { value } = e.target;
                        handleChange(value ? parseFloat(value) : undefined);
                      }}
                      onBlur={handleBlur}
                      placeholder="Enter opening balance"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Parent */}
          <Grid2 size={12}>
            <Field
              name="parentId"
              validators={{
                onChange: z.number().nullable(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <Autocomplete
                      id="parentId"
                      value={customerOptions.find((opt) => opt.value === state.value) ?? null}
                      options={customerOptions}
                      onChange={(_, selection) => handleChange(selection?.value)}
                      onBlur={handleBlur}
                      renderInput={(params) => <TextField {...params} label="Parent Customer" />}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>
        </>
      )}
    </MastersFormWrapper>
  );
}
