import { SearchTwoTone } from '@mui/icons-material';
import { InputAdornment, SxProps, TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from '../../helpers/hooks/use-debounce';

export interface IDebouncedSearchFieldProps {
  size?: TextFieldProps['size'];
  sx?: SxProps;
  disabled?: boolean;
  value: string;
  onChange: (search: string) => void;
  variant: TextFieldProps['variant'];
  placeholder: string;
  debouncedTime: number;
  minInputLength: number;
  autoFocus?: boolean;
  hasSearchIcon?: boolean;
}

export default function DebouncedSearchField({
  size,
  sx,
  disabled = false,
  value,
  onChange,
  variant,
  placeholder,
  debouncedTime,
  minInputLength,
  autoFocus = false,
  hasSearchIcon = true,
  ...props
}: IDebouncedSearchFieldProps) {
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
      autoFocus={autoFocus}
      disabled={disabled}
      variant={variant}
      placeholder={placeholder}
      value={search}
      onChange={handleSearchChange}
      sx={sx}
      slotProps={{
        input: {
          startAdornment: hasSearchIcon ? (
            <InputAdornment position="start">
              <SearchTwoTone />
            </InputAdornment>
          ) : null,
        },
      }}
      {...(props || {})}
    />
  );
}
