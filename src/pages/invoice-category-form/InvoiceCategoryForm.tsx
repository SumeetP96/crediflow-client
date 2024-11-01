import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { z } from 'zod';
import { ApiRoutes } from '../../api/routes';
import { QueryKeys } from '../../api/types';
import MastersFormWrapper, {
  IMastersFormWrapperProps,
} from '../../components/masters-form-wrapper/MastersFormWrapper';
import { ERecordStatus, TUserStatus } from '../../helpers/types';
import { AppRoute } from '../../router/helpers';
import { invoiceCategoryStatusOptions } from '../invoice-categories-listing/constants';
import { IInvoiceCategory } from '../invoice-categories-listing/types';
import { IFormInvoiceCategory } from './types';

export default function InvoiceCategoryForm() {
  const formWrapperProps: IMastersFormWrapperProps<IInvoiceCategory, IFormInvoiceCategory> = {
    createTitle: 'Create New Invoice Category',
    updateTitle: 'Update Invoice Category',
    heading: 'Invoice Category Details',
    fallbackPrevRoute: AppRoute('INVOICE_CATEGORIES_LIST'),
    defaultValues: (category) => ({
      name: category?.name ?? '',
      prefix: category?.prefix ?? '',
      suffix: category?.suffix ?? '',
      description: category?.description ?? '',
      isAutoIncrement: category?.isAutoIncrement ?? true,
      status: category?.status ?? 'active',
    }),
    readRecord: {
      key: QueryKeys.INVOICE_CATEGORIES_BY_ID,
      apiRoute: (id) => ApiRoutes.INVOICE_CATEGORIES_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.INVOICE_CATEGORIES_CREATE,
      apiRoute: () => ApiRoutes.INVOICE_CATEGORIES_CREATE,
    },
    updateRecord: {
      key: QueryKeys.INVOICE_CATEGORIES_UPDATE,
      apiRoute: (id) => ApiRoutes.INVOICE_CATEGORIES_UPDATE(id),
    },
    deleteRecord: {
      key: QueryKeys.INVOICE_CATEGORIES_DELETE,
      apiRoute: (id) => ApiRoutes.INVOICE_CATEGORIES_DELETE(id),
      dialogTitle: 'Delete Invoice Category',
      dialogBody: 'Are you sure you want to delete this invoice category?',
    },
    apiSuccessMessage: (action) => {
      return `Invoice Category ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.INVOICE_CATEGORIES_LISTING],
  };

  return (
    <MastersFormWrapper {...formWrapperProps} spacing={4}>
      {({ field: Field }) => (
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
                      placeholder="Enter name of invoice category"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Prefix */}
          <Grid2 size={6}>
            <Field
              name="prefix"
              validators={{
                onChange: z.string().max(10, 'Prefix cannot exceed 10 characters').optional(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="prefix"
                      label="Prefix"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter prefix"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Suffix */}
          <Grid2 size={6}>
            <Field
              name="suffix"
              validators={{
                onChange: z.string().max(10, 'Suffix cannot exceed 10 characters').optional(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="suffix"
                      label="Suffix"
                      variant="outlined"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter suffix"
                      helperText={state.meta.errors.join(', ')}
                      error={Boolean(state.meta.errors.length)}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Auto Increment */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Field
              name="isAutoIncrement"
              validators={{
                onChange: z.boolean(),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="role">Auto Increment</InputLabel>
                    <Select
                      labelId="isAutoIncrement"
                      id="isAutoIncrement"
                      value={state.value ? 'yes' : 'no'}
                      label="Auto Increment"
                      onChange={(e) => handleChange(e.target.value === 'yes')}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                    {state.meta.errors.length ? (
                      <FormHelperText>{state.meta.errors.join(', ')}</FormHelperText>
                    ) : null}
                  </FormControl>
                );
              }}
            />
          </Grid2>

          {/* Status */}
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
                      {invoiceCategoryStatusOptions.map((status) => (
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

          <Grid2 size={12}>
            <Field
              name="description"
              validators={{ onChange: z.string().optional() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      maxRows={3}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      placeholder="Enter description"
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
    </MastersFormWrapper>
  );
}
