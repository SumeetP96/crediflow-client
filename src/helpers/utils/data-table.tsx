import { AutoDelete } from '@mui/icons-material';
import { IDataTableFilter, IDataTableFilterSelectOption } from '../../components/data-table/types';

export const yesNoOptions: IDataTableFilterSelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export function yesNoRender(value: string) {
  return value ? (value === 'yes' ? 'Yes' : 'No') : '';
}

export function showDeletedFilter<T>(): IDataTableFilter<T> {
  return {
    field: 'isDeletedShown' as keyof T,
    title: 'Show Deleted',
    type: 'select',
    label: 'Show Deleted',
    icon: <AutoDelete />,
    selectOptions: yesNoOptions,
    render: (_, value) => yesNoRender(value as string),
  };
}
