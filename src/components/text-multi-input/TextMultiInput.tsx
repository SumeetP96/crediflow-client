import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlProps,
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
import { useState } from 'react';

export interface IInputValue {
  index: number;
  value: string;
  isManuallyAdded: boolean;
  error?: string | null;
}

export interface ITextMultiInputProps {
  formControlProps?: FormControlProps;
  textFieldProps?: TextFieldProps;
  value?: string[];
  onChange: (value: string[]) => void;
  addButtonTooltip: string;
  min?: number;
  max?: number;
  required?: boolean;
  errors: ValidationError[];
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
  min,
  max,
  required,
  errors,
}: ITextMultiInputProps) {
  const theme = useTheme();

  const [inputValues, setInputValues] = useState<IInputValue[]>(() => {
    const parsedValue = value ? (Array.isArray(value) ? value : [value]) : [];

    if (!parsedValue?.length) {
      return [emptyInputValue];
    }

    return parsedValue.map((value, index) => ({ index, value, error: '' }) as IInputValue);
  });

  const handChange = (value: string, index: number) => {
    setInputValues(
      produce((draft) => {
        draft[index].value = value;
        if (required && !value.trim().length) {
          draft[index].error = 'This field is required';
        } else {
          if (min && value.trim().length < min) {
            draft[index].error = `Minimum ${min} characters required`;
          } else if (max && value.trim().length > max) {
            draft[index].error = `Value cannot exceed ${max} characters`;
          } else {
            draft[index].error = '';
          }
        }
        onChange(draft.map((d) => d.value));
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
          onChange(draft.map((d) => d.value));
        }
      }),
    );
  };

  const hasParentError = errors.length > 0;

  return (
    <Box>
      <Paper
        sx={{
          pl: { xs: 1.5, md: 2 },
          pr: 1,
          py: { xs: 1.5, md: 2 },
          border: hasParentError ? `1px solid ${theme.palette.error.main}` : 'auto',
        }}
        variant="outlined"
      >
        <Typography
          color={hasParentError ? 'error' : 'textPrimary'}
          sx={{ mb: { xs: 1.5, md: 2 } }}
        >
          Contact Numbers
        </Typography>

        {inputValues.map((inputValue, i) => {
          const isLast = i === inputValues.length - 1;
          return (
            <Box key={`${i}-input`} display="flex" alignItems="flex-start" gap={0.5}>
              <FormControl fullWidth {...formControlProps}>
                <TextField
                  autoFocus={inputValue.isManuallyAdded}
                  value={inputValue.value}
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
          );
        })}
      </Paper>

      {hasParentError ? (
        <Typography color="error" variant="caption" sx={{ ml: { xs: 1.5, md: 2 } }}>
          {errors.join(', ')}
        </Typography>
      ) : null}
    </Box>
  );
}
