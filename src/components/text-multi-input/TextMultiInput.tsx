import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlProps,
  Grid2,
  Grid2Props,
  IconButton,
  Paper,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ValidationError } from '@tanstack/react-form';
import { produce } from 'immer';
import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { ZodSchema } from 'zod';

export interface IInputValue {
  index: number;
  value?: string;
  isManuallyAdded: boolean;
  error?: string | null;
}

export interface ITextMultiInputProps {
  formControlProps?: FormControlProps;
  textFieldProps?: TextFieldProps;
  value?: string[] | number[];
  onChange: (value: string[]) => void;
  addButtonTooltip: string;
  errors: ValidationError[];
  validationSchema?: ZodSchema;
  title: string;
  girdSize?: Grid2Props['size'];
  forceTrim?: boolean;
}

const emptyInputValue: IInputValue = {
  index: 0,
  value: '',
  isManuallyAdded: false,
  error: '',
};

export default function TextMultiInput({
  formControlProps,
  textFieldProps,
  value,
  onChange,
  addButtonTooltip,
  errors,
  validationSchema,
  title,
  girdSize = 12,
  forceTrim = false,
}: ITextMultiInputProps) {
  const theme = useTheme();

  const location = useLocation();

  const initRef = useRef<boolean>(false);

  const [inputValues, setInputValues] = useState<IInputValue[]>([emptyInputValue]);

  useLayoutEffect(() => {
    if (value?.length && initRef.current === false) {
      initRef.current = true;

      const parsedValues = value ? (Array.isArray(value) ? value : [value]) : [];

      setInputValues(
        parsedValues.map((value, index) => ({ index, value, error: '' }) as IInputValue),
      );
    }
  }, [value]);

  useLayoutEffect(() => {
    initRef.current = false;
  }, [location.pathname]);

  const emitChange = (draft: IInputValue[]) => {
    const values = draft.map((d) => d.value).filter(Boolean);
    onChange(values.length ? (values as string[]) : []);
  };

  const handChange = (value: string, index: number) => {
    initRef.current = true;
    setInputValues(
      produce((draft) => {
        const transformedValue = forceTrim ? value.trim() : value;
        const safeValue = transformedValue.length ? transformedValue : undefined;
        draft[index].value = safeValue;
        if (validationSchema) {
          const validated = validationSchema.safeParse(safeValue);
          if (!validated.success) {
            draft[index].error = validated.error.issues[0].message;
          } else {
            draft[index].error = '';
          }
        }
        emitChange(draft);
      }),
    );
  };

  const addInput = () => {
    setInputValues(
      produce((draft) => {
        draft.push({ ...emptyInputValue, index: draft.length, isManuallyAdded: true });
      }),
    );
  };

  const removeInput = (index: number) => {
    setInputValues(
      produce((draft) => {
        if (draft.length > 1) {
          draft.splice(index, 1);
          emitChange(draft);
        }
      }),
    );
  };

  return (
    <Box>
      <Paper
        sx={{
          pl: { xs: 1.5, md: 2 },
          pr: 1,
          py: { xs: 1.5, md: 2 },
          border: errors.length ? `1px solid ${theme.palette.error.main}` : 'auto',
        }}
        variant="outlined"
      >
        <Typography color={errors.length ? 'error' : 'textPrimary'}>{title}</Typography>

        <Grid2 container spacing={1}>
          {inputValues.map((inputValue, i) => {
            const isLast = i === inputValues.length - 1;
            return (
              <Grid2 key={`${i}-input`} size={girdSize} mt={{ xs: 1, md: 2 }}>
                <Box display="flex" alignItems="flex-start" gap={0.5}>
                  <FormControl fullWidth {...formControlProps}>
                    <TextField
                      autoFocus={inputValue.isManuallyAdded}
                      value={inputValue.value ?? ''}
                      onChange={(e) => handChange(e.target.value, i)}
                      helperText={inputValue.error}
                      error={Boolean(inputValue.error)}
                      {...textFieldProps}
                    />
                  </FormControl>

                  {isLast ? (
                    <Tooltip title={addButtonTooltip}>
                      <IconButton sx={{ mt: 1 }} onClick={() => addInput()}>
                        <AddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Remove">
                      <IconButton sx={{ mt: 1 }} onClick={() => removeInput(i)}>
                        <RemoveCircleOutline />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Grid2>
            );
          })}
        </Grid2>
      </Paper>

      {errors.length ? (
        <Typography color="error" variant="caption" sx={{ ml: { xs: 1.5, md: 2 } }}>
          {errors.join(', ')}
        </Typography>
      ) : null}
    </Box>
  );
}
