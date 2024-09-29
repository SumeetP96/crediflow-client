import { SearchTwoTone } from '@mui/icons-material';
import { InputAdornment, SxProps, TextField, TextFieldProps } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import useDebounce from '../../helpers/hooks/use-debounce';

export interface IDebouncedSearchFieldProps {
  size?: TextFieldProps['size'];
  sx?: SxProps;
  disabled?: boolean;
  type?: TextFieldProps['type'];
  value: string;
  onChange: (value: string) => void;
  variant: TextFieldProps['variant'];
  placeholder: string;
  debounceTime: number;
  minInputLength: number;
  autoFocus?: boolean;
  hasSearchIcon?: boolean;
}

const DebouncedSearchField = forwardRef(
  (
    {
      size,
      sx,
      disabled = false,
      type = 'text',
      value,
      onChange,
      variant,
      placeholder,
      debounceTime,
      minInputLength,
      autoFocus = false,
      hasSearchIcon = true,
      ...props
    }: IDebouncedSearchFieldProps,
    ref,
  ) => {
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
    }, debounceTime);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(e.target.value);
      debouncedRequest();
    };

    return (
      <TextField
        size={size}
        type={type}
        inputRef={ref}
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
  },
);

export default DebouncedSearchField;
