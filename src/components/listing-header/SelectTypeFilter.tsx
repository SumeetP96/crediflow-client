import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { TMultiSelectOptionValue } from '../../helpers/types';
import { IDataTableFilterSelectOption } from '../data-table/DataTable';
import { ISelectedFilter } from './types';

export type TSelectedOption =
  | IDataTableFilterSelectOption
  | IDataTableFilterSelectOption[]
  | string
  | undefined;

export interface ISelectTypeFilterProps<Col> {
  filter: ISelectedFilter<Col>;
  value: TMultiSelectOptionValue | TMultiSelectOptionValue[];
  onChange: (value: TMultiSelectOptionValue | TMultiSelectOptionValue[]) => void;
  multiple?: boolean;
}

export default function SelectTypeFilter<Col>({
  filter,
  value,
  onChange,
  multiple = false,
}: ISelectTypeFilterProps<Col>) {
  const selectedOption: TSelectedOption = useMemo(() => {
    if (!value) {
      return multiple ? [] : '';
    }

    const singleSelectedOption = filter.selectOptions?.find((opt) => opt.value === value);

    if (Array.isArray(value)) {
      return filter.selectOptions?.filter((opt) => value.includes(opt.value));
    }

    if (multiple && singleSelectedOption) {
      return [singleSelectedOption];
    }

    return singleSelectedOption;
  }, [filter.selectOptions, multiple, value]);

  const handleChange = (
    selection: IDataTableFilterSelectOption | IDataTableFilterSelectOption[],
  ) => {
    if (Array.isArray(selection)) {
      const value = selection.map((opt) => opt.value);
      onChange(value);
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
        onChange={(_, v) =>
          handleChange(v as IDataTableFilterSelectOption | IDataTableFilterSelectOption[])
        }
      />
    </Box>
  );
}
