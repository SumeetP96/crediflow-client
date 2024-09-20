import { SearchTwoTone } from '@mui/icons-material';
import { InputAdornment, SxProps, TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from '../../helpers/hooks/use-debounce';

export interface IDebouncedSearchField {
  size?: TextFieldProps['size'];
  sx?: SxProps;
  disabled: boolean;
  value: string;
  onChange: (search: string) => void;
  variant: TextFieldProps['variant'];
  placeholder: string;
  debouncedTime: number;
  minInputLength: number;
}

export default function DebouncedSearchField({
  size,
  sx,
  disabled,
  value,
  onChange,
  variant,
  placeholder,
  debouncedTime,
  minInputLength,
}: IDebouncedSearchField) {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const debouncedRequest = useDebounce(() => {
    if (search && search.length >= minInputLength) {
      onChange(search ?? '');
    } else {
      onChange('');
    }
  }, debouncedTime);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
    debouncedRequest();
  };

  return (
    <TextField
      size={size}
      autoComplete="off"
      disabled={disabled}
      variant={variant}
      placeholder={placeholder}
      value={search}
      onChange={handleSearchChange}
      sx={sx}
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
  );
}
