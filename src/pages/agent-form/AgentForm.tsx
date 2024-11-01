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
import MastersFormWrapper, {
  IMastersFormWrapperProps,
} from '../../components/masters-form-wrapper/MastersFormWrapper';
import TextMultiInput from '../../components/text-multi-input/TextMultiInput';
import { ERecordStatus, TUserStatus } from '../../helpers/types';
import { urlWithParams } from '../../helpers/utils/builders';
import { AppRoute } from '../../router/helpers';
import { agentStatusOptions } from '../agents-listing/constants';
import { IAgent } from '../agents-listing/types';
import { ECustomerAddressStatus, ECustomerContactNumberStatus } from '../customers-listing/types';
import { IFormAgent, TAgentOption } from './types';

export default function AgentForm() {
  const params = useParams();

  const id = params.id ? parseInt(params.id, 10) : undefined;

  const formWrapperProps: IMastersFormWrapperProps<IAgent, IFormAgent> = {
    createTitle: 'Create New Agent',
    updateTitle: 'Update Agent',
    heading: 'Agent Details',
    fallbackPrevRoute: AppRoute('AGENTS_LIST'),
    defaultValues: (agent) => ({
      parentId: agent?.parentId ?? null,
      name: agent?.name ?? '',
      contactNumbers: agent?.contactNumbers ?? [],
      addresses: agent?.addresses ?? [],
      status: agent?.status ?? 'active',
    }),
    readRecord: {
      key: QueryKeys.AGENTS_BY_ID,
      apiRoute: (id) => ApiRoutes.AGENT_BY_ID(id),
    },
    createRecord: {
      key: QueryKeys.AGENTS_CREATE,
      apiRoute: () => ApiRoutes.AGENT_CREATE,
    },
    updateRecord: {
      key: QueryKeys.AGENTS_UPDATE,
      apiRoute: (id) => ApiRoutes.AGENT_UPDATE(id),
    },
    deleteRecord: {
      key: QueryKeys.AGENTS_DELETE,
      apiRoute: (id) => ApiRoutes.AGENT_DELETE(id),
      dialogTitle: 'Delete Agent',
      dialogBody: 'Are you sure you want to delete this agent?',
    },
    apiSuccessMessage: (action) => {
      return `Agent ${action.charAt(0).toUpperCase() + action.slice(1)}d successfully`;
    },
    successQueryInvalidateKeys: [QueryKeys.AGENTS_LISTING],
    customFieldErrors: {
      contactNumbers: [],
      addresses: [],
    },
  };

  const optionsQuery = useQuery({
    queryKey: [QueryKeys.AGENTS_OPTIONS],
    queryFn: () => axiosGet<TAgentOption[]>(urlWithParams(ApiRoutes.AGENT_OPTIONS, { id })),
    retry: false,
  });

  const optionsData = optionsQuery.data?.data;

  const agentOptions = useMemo(() => {
    return optionsData
      ? optionsData.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      : [];
  }, [optionsData]);

  return (
    <MastersFormWrapper {...formWrapperProps} spacing={4}>
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
                      placeholder="Enter name of agent"
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
                      setCustomFieldErrors<IFormAgent>('contactNumbers', errorMessages)
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
                      setCustomFieldErrors<IFormAgent>('addresses', errorMessages)
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
                      {agentStatusOptions.map((status) => (
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
                      value={agentOptions.find((opt) => opt.value === state.value) ?? null}
                      options={agentOptions}
                      onChange={(_, selection) => handleChange(selection?.value)}
                      onBlur={handleBlur}
                      renderInput={(params) => <TextField {...params} label="Parent Agent" />}
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
