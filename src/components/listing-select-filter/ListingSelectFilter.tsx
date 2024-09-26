import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { IListingSelectedFilter, TListingFilterValue } from '../../helpers/types';
import { IDataTableFilterSelectOption } from '../data-table/DataTable';

export type TSelectedOption =
  | IDataTableFilterSelectOption
  | IDataTableFilterSelectOption[]
  | string;

export interface IListingSelectFilter<Col> {
  filter: IListingSelectedFilter<Col>;
  value: TListingFilterValue | TListingFilterValue[];
  onChange: (value: TListingFilterValue | TListingFilterValue[]) => void;
  multiple?: boolean;
}

export default function ListingSelectFilter<Col>({
  filter,
  value,
  onChange,
  multiple = false,
}: IListingSelectFilter<Col>) {
  const selectedOption = useMemo(() => {
    const defValue = multiple ? [] : '';

    if (!value) {
      return defValue;
    }

    const singleSelectedOption = filter.selectOptions?.find((opt) => opt.value === value) || '';

    if (Array.isArray(value)) {
      return filter.selectOptions?.filter((opt) => value.includes(opt.value)) ?? defValue;
    }

    if (multiple && singleSelectedOption) {
      return [singleSelectedOption];
    }

    return singleSelectedOption || defValue;
  }, [filter.selectOptions, multiple, value]);

  const handleChange = (
    selection: IDataTableFilterSelectOption | IDataTableFilterSelectOption[],
  ) => {
    if (Array.isArray(selection)) {
      const value = selection.map((opt) => opt.value);
      onChange(value.length ? value : ''); // To preserve empty filter
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
        value={selectedOption as IDataTableFilterSelectOption | IDataTableFilterSelectOption[]}
        disablePortal
        size="small"
        options={filter.selectOptions || []}
        sx={{ mt: 1, minWidth: 200 }}
        renderInput={(params) => <TextField {...params} autoFocus />}
        onChange={(_, v) => handleChange(v)}
      />
    </Box>
  );
}
