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
import FormWrapper, { IFormWrapperProps } from '../../components/form-wrapper/FormWrapper';
import { ERecordStatus, TUserStatus } from '../../helpers/types';
import { AppRoute } from '../../router/helpers';
import { transactionTypeStatusOptions } from '../transaction-types-listing/constants';
import { ITransactionType } from '../transaction-types-listing/types';
import { IFormTransactionType } from './types';

export default function TransactionTypeForm() {
  const formWrapperProps: IFormWrapperProps<ITransactionType, IFormTransactionType> = {
    createTitle: 'Create New Transaction Type',
    updateTitle: 'Update Transaction Type',
    heading: 'Transaction Type Details',
    fallbackPrevRoute: AppRoute('TRANSACTION_TYPES_LIST'),
    defaultValues: (transactionType) => ({
      name: transactionType?.name ?? '',
      isDeduction: transactionType?.isDeduction ?? true,
      description: transactionType?.description ?? '',
      status: transactionType?.status ?? 'active',
    }),
    readRecord: {
      key: QueryKeys.TRANSACTION_TYPES_BY_ID,
      apiRoute: (id) => ApiRoutes.TRANSACTION_TYPES_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.TRANSACTION_TYPES_CREATE,
      apiRoute: () => ApiRoutes.TRANSACTION_TYPES_CREATE,
    },
    updateRecord: {
      key: QueryKeys.TRANSACTION_TYPES_UPDATE,
      apiRoute: (id) => ApiRoutes.TRANSACTION_TYPES_UPDATE(id),
    },
    deleteRecord: {
      key: QueryKeys.TRANSACTION_TYPES_DELETE,
      apiRoute: (id) => ApiRoutes.TRANSACTION_TYPES_DELETE(id),
      dialogTitle: 'Delete Transaction Type',
      dialogBody: 'Are you sure you want to delete this transaction type?',
    },
    apiSuccessMessage: (action) => {
      return `Transaction Type ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.TRANSACTION_TYPES_LISTING],
  };

  return (
    <FormWrapper {...formWrapperProps} spacing={4}>
      {({ form }) => (
        <>
          {/* Name */}
          <Grid2 size={12}>
            <form.Field
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

          {/* Is Deduction */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <form.Field
              name="isDeduction"
              validators={{ onChange: z.boolean() }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="isDeduction">Auto Increment</InputLabel>
                    <Select
                      labelId="isDeduction"
                      id="isDeduction"
                      value={state.value ? 'yes' : 'no'}
                      label="Is Deduction"
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
            <form.Field
              name="status"
              validators={{
                onChange: z.enum([ERecordStatus.ACTIVE, ERecordStatus.IN_ACTIVE], {
                  message: 'Invalid status. Expected "Active" or "Inactive"',
                }),
              }}
              children={({ state, handleChange, handleBlur }) => {
                return (
                  <FormControl fullWidth error={Boolean(state.meta.errors.length)}>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={state.value}
                      label="Status"
                      onChange={(e) => handleChange(e.target.value as TUserStatus)}
                      onBlur={handleBlur}
                    >
                      {transactionTypeStatusOptions.map((status) => (
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
            <form.Field
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
    </FormWrapper>
  );
}
