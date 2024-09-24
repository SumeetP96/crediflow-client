import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useMemo } from 'react';
import { IDataTableFilterSelectOption } from '../data-table/DataTable';
import { ISelectedFilter, TSelectedOptionValue } from './types';

export interface ISelectTypeFilterProps<Col> {
  filter: ISelectedFilter<Col>;
  value: TSelectedOptionValue;
  onChange: (value: TSelectedOptionValue) => void;
  multiple?: boolean;
}

export default function SelectTypeFilter<Col>({
  filter,
  value,
  onChange,
  multiple = false,
}: ISelectTypeFilterProps<Col>) {
  const selectedOption = useMemo(() => {
    let selectedOption: IDataTableFilterSelectOption | IDataTableFilterSelectOption[] | undefined;

    if (!value) {
      return selectedOption;
    }

    const singleSelectedOption = filter.selectOptions?.find((opt) => opt.value === value);

    if (Array.isArray(value)) {
      selectedOption = filter.selectOptions?.filter((opt) => value.includes(opt.value));
    } else if (multiple && singleSelectedOption) {
      selectedOption = [singleSelectedOption];
    } else {
      selectedOption = singleSelectedOption;
    }
  }, [filter.selectOptions, multiple, value]);

  const handleChange = (
    _: SyntheticEvent,
    selection: IDataTableFilterSelectOption | IDataTableFilterSelectOption[],
  ) => {
    if (Array.isArray(selection)) {
      const value = selection.map((opt) => opt.value);
      onChange(value || '');
    } else {
      onChange(selection.value);
    }
  };

  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Typography variant="subtitle2">{filter.label} is:</Typography>

      <Autocomplete
        multiple={multiple}
        disableClearable
        autoFocus
        value={selectedOption}
        disablePortal
        size="small"
        options={filter.selectOptions || []}
        sx={{ mt: 1, minWidth: 200 }}
        renderInput={(params) => <TextField {...params} autoFocus />}
        onChange={handleChange}
      />
    </Box>
  );
}
