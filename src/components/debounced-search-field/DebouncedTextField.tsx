import { SearchTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';
import useDebounce from '../../helpers/hooks/use-debounce';

export interface IDebouncedSearchField {
  disabled: boolean;
  value: string;
  onChange: (search: string) => void;
  variant: TextFieldProps['variant'];
  placeholder: string;
  debouncedTime: number;
  minInputLength: number;
}

export default function DebouncedSearchField({
  disabled,
  value,
  onChange,
  variant,
  placeholder,
  debouncedTime,
  minInputLength,
}: IDebouncedSearchField) {
  const [search, setSearch] = useState<string>(value);

  const debouncedRequest = useDebounce(() => {
    if (search.length >= minInputLength) {
      onChange(search ?? '');
    } else {
      onChange('');
    }
  }, debouncedTime);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(e.target.value);
    debouncedRequest();
  };

  return (
    <FormControl fullWidth>
      <TextField
        autoComplete="off"
        disabled={disabled}
        variant={variant}
        placeholder={placeholder}
        defaultValue={search}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoTone />
              </InputAdornment>
            ),
          },
        }}
      />
    </FormControl>
  );
}
