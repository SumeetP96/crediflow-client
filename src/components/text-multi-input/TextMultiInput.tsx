import { AddCircleOutline, RemoveCircleOutline, Star, StarOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid2,
  Grid2Props,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from '@mui/material';
import { produce } from 'immer';
import { ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { ZodIssue, ZodSchema } from 'zod';
import { ERecordStatus } from '../../helpers/types';
import { ECustomerContactNumberStatus } from '../../pages/customers-listing/types';
import { EDialogIds } from '../dialog-provider/constants';
import useDialog from '../dialog-provider/use-dialog';
import { emptyInputAddressValue, emptyInputContactNumberValue } from './constants';
import { ITextMultiInputRecordType, TInputValue, TTextMultiInputErrorMap } from './types';

export interface ITextMultiInputProps<ValueType> {
  textFieldProps?: TextFieldProps;
  values: ValueType[];
  onChange: (value: ValueType[]) => void;
  addButtonTooltip: string;
  parentErrors: string[];
  setParentErrors?: (errorMessages: string[]) => void;
  appendParentError?: (errorMessages: string[]) => void;
  validationSchema: ZodSchema;
  title: string;
  girdSize?: Grid2Props['size'];
  type: ITextMultiInputRecordType;
  deactivatePrimaryStatusInfoDialogProps: {
    title?: string;
    body?: ReactNode;
    acceptLabel?: string;
  };
  inactivePrimarySwitchInfoDialogProps: {
    title?: string;
    body?: ReactNode;
    acceptLabel?: string;
  };
  primaryUpdateConfirmationDialogProps: {
    title?: string;
    body?: ReactNode;
    removeTitle?: string;
    removeBody?: string;
  };
}

export default function TextMultiInput<ValueType>({
  textFieldProps,
  values,
  onChange,
  addButtonTooltip,
  parentErrors,
  setParentErrors,
  validationSchema,
  title,
  girdSize = 12,
  type,
  deactivatePrimaryStatusInfoDialogProps,
  inactivePrimarySwitchInfoDialogProps,
  primaryUpdateConfirmationDialogProps,
}: ITextMultiInputProps<ValueType>) {
  const location = useLocation();

  const { openDialog, closeDialog } = useDialog();

  const initRef = useRef<boolean>(false);

  const inputTypeEmptyValue = useMemo(() => {
    if (type === 'contact-numbers') {
      return emptyInputContactNumberValue;
    }
    if (type === 'addresses') {
      return emptyInputAddressValue;
    }
    return {} as TInputValue;
  }, [type]);

  const [inputValues, setInputValues] = useState<TInputValue[]>([inputTypeEmptyValue]);

  const updateParentError = (errorMessage?: string) => {
    const genericErrorMessage = 'One or more fields have errors';
    setParentErrors?.([errorMessage || genericErrorMessage]);
  };

  const clearParentErrors = useCallback(() => {
    setParentErrors?.([]);
  }, [setParentErrors]);

  useLayoutEffect(() => {
    if (values?.length && initRef.current === false) {
      initRef.current = true;

      setInputValues(() => {
        const inputValues = (values as TInputValue[]).map((value, index) => {
          const obj: TInputValue = {
            index,
            isManuallyAdded: false,
            isPrimary: (value as TInputValue).isPrimary,
            status: (value as TInputValue).status,
            errorMap: { status: '' } as TTextMultiInputErrorMap,
          };

          if (type === 'contact-numbers') {
            obj.number = value.number;
            obj.errorMap.number = '';
          }

          if (type === 'addresses') {
            obj.address = value.address;
            obj.errorMap.address = '';
          }

          return obj;
        });

        return inputValues;
      });

      clearParentErrors();
    }
  }, [clearParentErrors, setParentErrors, type, values]);

  useLayoutEffect(() => {
    initRef.current = false;
  }, [location.pathname]);

  const emitChange = (draft: TInputValue[]) => {
    let values = draft.filter(Boolean);

    if (type === 'contact-numbers') {
      values = draft.filter((d) => String(d.number).length > 0);
    } else if (type === 'addresses') {
      values = draft.filter((d) => String(d.address).length > 0);
    }

    onChange((values.length ? values : []) as unknown as ValueType[]);
  };

  const handleAddressChange = (index: number, value: string) => {
    initRef.current = true;

    const draft = produce(inputValues, (draft) => {
      draft[index].address = value;

      const validated = validationSchema.safeParse(draft[index]);

      if (!validated.success) {
        const errors: ZodIssue[] = JSON.parse(String(validated.error?.message));

        draft[index].errorMap = {
          ...draft[index].errorMap,
          ...errors.reduce((acc: Record<string, string>, err) => {
            acc[err.path[0]] = err.message;
            return acc;
          }, {}),
        };

        updateParentError();
      } else {
        draft[index].errorMap = {} as TTextMultiInputErrorMap;
        clearParentErrors();
      }
    });

    emitChange(draft);

    setInputValues(draft);
  };

  const handleContactNumberChange = (index: number, value: string) => {
    initRef.current = true;

    const draft = produce(inputValues, (draft) => {
      let safeValue: string | undefined = value;

      const transformedValue = type === 'contact-numbers' ? value.trim() : value;

      if (transformedValue) {
        safeValue = transformedValue;
      }

      draft[index].number = safeValue;

      const validated = validationSchema.safeParse(draft[index]);

      if (!validated.success) {
        draft[index].errorMap.number = validated.error.issues[0].message;
        updateParentError();
      } else {
        draft[index].errorMap.number = '';
        clearParentErrors();
      }
    });

    emitChange(draft);

    setInputValues(draft);
  };

  const handleStatusChange = (index: number, status: ERecordStatus) => {
    initRef.current = true;

    const draft = produce(inputValues, (draft) => {
      const input = draft[index];

      if (input.isPrimary && status === ERecordStatus.IN_ACTIVE) {
        openDialog(EDialogIds.INFORMATION, {
          title: deactivatePrimaryStatusInfoDialogProps.title || 'Failed to Update Status',
          body:
            deactivatePrimaryStatusInfoDialogProps.body ||
            'Cannot deactivate primary record. Please unset it from primary or assign a different record as primary before performing this action.',
          acceptLabel: deactivatePrimaryStatusInfoDialogProps.acceptLabel || 'Okay',
          onClose: () => closeDialog(),
        });
        return;
      }

      const validated = validationSchema.safeParse(draft[index]);
      if (!validated.success) {
        draft[index].errorMap.status = validated.error.issues[0].message;
      } else {
        draft[index].errorMap.status = '';
      }

      draft[index].status = status;
    });

    emitChange(draft);

    setInputValues(draft);
  };

  const addInput = () => {
    setInputValues(
      produce((draft) => {
        draft.push({
          ...inputTypeEmptyValue,
          index: draft.length,
          isManuallyAdded: true,
          isPrimary: !draft.length,
        });
      }),
    );
  };

  const removeInput = (index: number) => {
    const draft = produce(inputValues, (draft) => {
      if (draft.length > 1) {
        draft.splice(index, 1);
      }
    });

    console.log('🚀 ~ draft ~ draft:', draft);

    emitChange(draft);

    setInputValues(draft);
  };

  const handleTogglePrimary = (inputValue: TInputValue) => {
    const newValue = !inputValue.isPrimary;

    if (inputValue.status === ERecordStatus.IN_ACTIVE && newValue === true) {
      openDialog(EDialogIds.INFORMATION, {
        title: inactivePrimarySwitchInfoDialogProps.title || 'Failed to Update Primary Record',
        body:
          inactivePrimarySwitchInfoDialogProps.body ||
          'Cannot set an inactive record as primary. Please activate the record to set it as primary.',
        acceptLabel: inactivePrimarySwitchInfoDialogProps.acceptLabel || 'Okay',
        onClose: () => closeDialog(),
      });
      return;
    }

    let title = primaryUpdateConfirmationDialogProps.title || 'Update Primary Record';
    let body =
      primaryUpdateConfirmationDialogProps.body ||
      'Are you sure you want to change the primary record?';

    if (newValue === false) {
      title = primaryUpdateConfirmationDialogProps.removeTitle || 'Remove Primary Record';
      body =
        primaryUpdateConfirmationDialogProps.removeBody ||
        'Are you sure you want to remove the primary record?';
    }

    openDialog(EDialogIds.CONFIRMATION, {
      title,
      body,
      onAccept: () =>
        setInputValues(
          produce((draft) => {
            draft.forEach((d, i) => {
              if (i === inputValue.index) {
                d.isPrimary = newValue;
              } else {
                d.isPrimary = newValue === true ? false : d.isPrimary;
              }
            });
          }),
        ),
      onClose: () => closeDialog(),
    });
  };

  return (
    <Box>
      <Typography color={parentErrors.length ? 'error' : 'textPrimary'}>{title}</Typography>

      {parentErrors.length ? (
        <Typography color="error" variant="caption">
          ({parentErrors.join(', ')})
        </Typography>
      ) : null}

      <Grid2 container spacing={2} sx={{ mt: 1 }}>
        {inputValues.map((inputValue, i) => {
          let isSetPrimaryBtnDisabled = true;

          if (type === 'contact-numbers' && inputValue.number) {
            isSetPrimaryBtnDisabled = false;
          } else if (type === 'addresses' && inputValue.address) {
            isSetPrimaryBtnDisabled = false;
          }

          return (
            <Grid2 key={`${i}-input`} size={girdSize} mt={1}>
              <Box
                display="flex"
                alignItems="flex-start"
                flexGrow={1}
                gap={{ xs: 1.5, md: 1 }}
                flexWrap={{ xs: 'wrap', md: 'unset' }}
              >
                {/* Contact Number */}
                {type === 'contact-numbers' ? (
                  <FormControl fullWidth>
                    <TextField
                      autoFocus={inputValue.isManuallyAdded}
                      value={inputValue.number ?? ''}
                      onChange={(e) => handleContactNumberChange(i, e.target.value)}
                      label="Contact Number"
                      placeholder="Contact Number"
                      helperText={inputValue.errorMap?.number}
                      error={Boolean(inputValue.errorMap?.number)}
                      {...textFieldProps}
                    />
                  </FormControl>
                ) : null}

                {type === 'addresses' ? (
                  <FormControl fullWidth>
                    <TextField
                      autoFocus={inputValue.isManuallyAdded}
                      multiline
                      maxRows={3}
                      value={inputValue.address ?? undefined}
                      onChange={(e) => handleAddressChange(i, e.target.value)}
                      label="Address"
                      placeholder="Enter complete address"
                      helperText={inputValue.errorMap?.address}
                      error={Boolean(inputValue.errorMap?.address)}
                      {...textFieldProps}
                    />
                  </FormControl>
                ) : null}

                {/* Actions */}
                <Box display="flex" alignItems="center" width={{ xs: '100%', md: 'auto' }} gap={1}>
                  {/* Status */}
                  <FormControl
                    sx={{
                      flexGrow: { xs: 1, md: 'unset' },
                      width: { xs: 'auto', md: '120px' },
                    }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={inputValue.status}
                      label="Status"
                      onChange={(e) => handleStatusChange(i, e.target.value as ERecordStatus)}
                    >
                      <MenuItem value={ECustomerContactNumberStatus.ACTIVE}>Active</MenuItem>
                      <MenuItem value={ECustomerContactNumberStatus.IN_ACTIVE}>In Active</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Primary */}
                  <Tooltip title={inputValue.isPrimary ? 'Unset Primary' : 'Set as Primary'}>
                    <span>
                      <Button
                        sx={{ minWidth: '37px', px: 0 }}
                        color="primary"
                        variant={inputValue.isPrimary ? 'contained' : 'outlined'}
                        disabled={isSetPrimaryBtnDisabled}
                        onClick={() => handleTogglePrimary(inputValue as TInputValue)}
                        disableElevation
                      >
                        {inputValue.isPrimary ? <Star /> : <StarOutline />}
                      </Button>
                    </span>
                  </Tooltip>

                  {/* Remove */}
                  <Tooltip title="Remove">
                    <span>
                      <IconButton
                        disabled={inputValues.length === 1}
                        onClick={() => removeInput(i)}
                        tabIndex={-1}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Box>

              {i < inputValues.length - 1 ? (
                <Divider sx={{ mt: 3, width: { xs: '90%', md: '95%' }, mx: 'auto' }} />
              ) : null}
            </Grid2>
          );
        })}
      </Grid2>

      <Tooltip title={addButtonTooltip}>
        <Button
          sx={{ mt: 2, width: { xs: '100%', md: '120px' } }}
          startIcon={<AddCircleOutline />}
          onClick={() => addInput()}
        >
          Add more
        </Button>
      </Tooltip>
    </Box>
  );
}
