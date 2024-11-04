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
import { useParams } from 'react-router';
import { z } from 'zod';
import { axiosGet } from '../../api/request';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import FormWrapper, { IFormWrapperProps } from '../../components/form-wrapper/FormWrapper';
import TextMultiInput from '../../components/text-multi-input/TextMultiInput';
import { ERecordStatus, TUserStatus } from '../../helpers/types';
import { urlWithParams } from '../../helpers/utils/builders';
import { yesNoOptions } from '../../helpers/utils/data-table';
import { AppRoute } from '../../router/helpers';
import { customerStatusOptions } from '../customers-listing/constants';
import {
  ECustomerAddressStatus,
  ECustomerContactNumberStatus,
  ICustomer,
} from '../customers-listing/types';
import { IFormCustomer, TCustomerOption } from './types';

export default function CustomerForm() {
  const params = useParams();

  const id = params.id ? parseInt(params.id, 10) : undefined;

  const formWrapperProps: IFormWrapperProps<ICustomer, IFormCustomer> = {
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
    customFieldErrors: {
      contactNumbers: [],
      addresses: [],
    },
  };

  const optionsQuery = useQuery({
    queryKey: [QueryKeys.CUSTOMERS_OPTIONS],
    queryFn: () => axiosGet<TCustomerOption[]>(urlWithParams(ApiRoutes.CUSTOMER_OPTIONS, { id })),
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
    <FormWrapper {...formWrapperProps} spacing={4}>
      {({ field: Field, customFieldErrors, setCustomFieldErrors }) => (
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
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <TextMultiInput
                    girdSize={{ xs: 12, md: 9 }}
                    type="contact-numbers"
                    title="Contact Numbers"
                    addButtonTooltip="Add contact number"
                    validationSchema={z.object({
                      // NOTE: Update in backend too
                      number: z
                        .string()
                        .min(8, 'Enter atleast 8 digits')
                        .max(15, 'Cannot exceed 15 digits')
                        .optional(),
                      isPrimary: z.boolean(),
                      status: z.enum([
                        ECustomerContactNumberStatus.ACTIVE,
                        ECustomerContactNumberStatus.IN_ACTIVE,
                      ]),
                    })}
                    values={state.value || []}
                    onChange={handleChange}
                    parentErrors={customFieldErrors.contactNumbers || []}
                    setParentErrors={(errorMessages) =>
                      setCustomFieldErrors<IFormCustomer>('contactNumbers', errorMessages)
                    }
                    textFieldProps={{
                      onBlur: handleBlur,
                    }}
                    deactivatePrimaryStatusInfoDialogProps={{
                      body: 'Cannot deactivate the primary contact number. Please unset it from primary or assign a different contact number as primary before performing this action.',
                    }}
                    inactivePrimarySwitchInfoDialogProps={{
                      title: 'Failed to update Primary Contact Number',
                      body: 'Cannot set an inactive number as primary. Please activate the number to set it as primary.',
                    }}
                    primaryUpdateConfirmationDialogProps={{
                      title: 'Update Primary Contact Number',
                      body: 'Are you sure you want to change the primary contact number?',
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
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <TextMultiInput
                    type="addresses"
                    title="Addresses"
                    addButtonTooltip="Add address"
                    validationSchema={z.object({
                      // NOTE: Update in backend too
                      address: z.string().optional(),
                      isPrimary: z.boolean(),
                      status: z.enum([
                        ECustomerAddressStatus.ACTIVE,
                        ECustomerAddressStatus.IN_ACTIVE,
                      ]),
                    })}
                    values={state.value || []}
                    onChange={handleChange}
                    parentErrors={customFieldErrors.addresses || []}
                    setParentErrors={(errorMessages) =>
                      setCustomFieldErrors<IFormCustomer>('addresses', errorMessages)
                    }
                    textFieldProps={{
                      onBlur: handleBlur,
                    }}
                    deactivatePrimaryStatusInfoDialogProps={{
                      body: 'Cannot deactivate the primary address. Please unset it from primary or assign a different address as primary before performing this action.',
                    }}
                    inactivePrimarySwitchInfoDialogProps={{
                      title: 'Failed to update Primary Address',
                      body: 'Cannot set an inactive address as primary. Please activate the address to set it as primary.',
                    }}
                    primaryUpdateConfirmationDialogProps={{
                      title: 'Update Primary Address',
                      body: 'Are you sure you want to change the primary address?',
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
              validators={{ onChange: z.boolean() }}
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
                onChange: z.enum([ERecordStatus.ACTIVE, ERecordStatus.IN_ACTIVE], {
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
    </FormWrapper>
  );
}
