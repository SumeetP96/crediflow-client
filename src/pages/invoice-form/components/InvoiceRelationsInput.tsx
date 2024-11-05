import { RemoveCircleOutline } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useMemo } from 'react';
import FormLabel from '../../../components/form-label/FormLabel';
import { useInvoiceFormStore } from '../store';
import { EInvoiceRelation, IInvoiceRelationValue } from '../types';

export interface IInvoiceRelationsInputProps {
  disabled: boolean;
  type: EInvoiceRelation;
  index: number;
  invoiceRelationValue: IInvoiceRelationValue;
  label: string;
  invoiceCustomerId?: number;
  placeholder?: string;
}

export default function InvoiceRelationsInput({
  disabled,
  type,
  index,
  invoiceRelationValue,
  label,
  invoiceCustomerId,
  placeholder,
}: IInvoiceRelationsInputProps) {
  const customerOptions = useInvoiceFormStore((state) => state.customerOptions);
  const agentOptions = useInvoiceFormStore((state) => state.agentOptions);
  const invoiceRelations = useInvoiceFormStore((state) => state.invoiceRelations);
  const updateRelation = useInvoiceFormStore((state) => state.updateRelation);
  const removeRelation = useInvoiceFormStore((state) => state.removeRelation);

  const optionMap = {
    [EInvoiceRelation.CUSTOMERS]: customerOptions,
    [EInvoiceRelation.AGENTS]: agentOptions,
  };

  const options = optionMap[type];

  const availableOptions = useMemo(() => {
    const filteredOptions = options.filter(
      (option) =>
        option.value === invoiceRelationValue.id ||
        !invoiceRelations[type].find((rel) => rel.id === option.value),
    );

    if (invoiceCustomerId) {
      return filteredOptions.filter((option) => option.value !== invoiceCustomerId);
    }

    return filteredOptions;
  }, [invoiceCustomerId, invoiceRelationValue.id, invoiceRelations, options, type]);

  return (
    <Box mt={2} display="flex" alignItems="center" gap={1} width="100%">
      <Autocomplete
        id={`${type}-${invoiceRelationValue.uid}`}
        disabled={disabled}
        value={availableOptions.find((opt) => opt.value === invoiceRelationValue.id) ?? null}
        options={availableOptions}
        onChange={(_, selection) => updateRelation(type, index, selection?.value as number)}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} label={<FormLabel label={label} />} />
        )}
        sx={{ flexGrow: 1 }}
      />

      <Button
        disableElevation
        disabled={disabled}
        tabIndex={-1}
        size="large"
        color="error"
        onClick={() => removeRelation(type, invoiceRelationValue.uid)}
        sx={{ minWidth: '40px', px: 0 }}
      >
        <RemoveCircleOutline />
      </Button>
    </Box>
  );
}
