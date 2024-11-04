import { RemoveCircleOutline } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useInvoiceFormStore } from '../store';
import { EInvoiceRelation, IInvoiceRelationValue } from '../types';

export interface IInvoiceRelationsInputProps {
  disabled: boolean;
  type: EInvoiceRelation;
  index: number;
  invoiceRelationValue: IInvoiceRelationValue;
  label: string;
  removeTooltipText: string;
  invoiceCustomerId?: number;
}

export default function InvoiceRelationsInput({
  disabled,
  type,
  index,
  invoiceRelationValue,
  label,
  removeTooltipText,
  invoiceCustomerId,
}: IInvoiceRelationsInputProps) {
  const customerOptions = useInvoiceFormStore((state) => state.customerOptions);
  const agentOptions = useInvoiceFormStore((state) => state.agentOptions);
  const invoiceRelations = useInvoiceFormStore((state) => state.invoiceRelations);
  const addRelation = useInvoiceFormStore((state) => state.addRelation);
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
        id={`${type}-${invoiceRelationValue.id}`}
        disabled={disabled}
        value={availableOptions.find((opt) => opt.value === invoiceRelationValue.id) ?? null}
        options={availableOptions}
        onChange={(_, selection) => addRelation(type, index, selection?.value as number)}
        renderInput={(params) => <TextField {...params} label={label} />}
        sx={{ flexGrow: 1 }}
      />

      <Tooltip title={removeTooltipText}>
        <span>
          <Button
            disableElevation
            disabled={disabled}
            size="large"
            color="error"
            onClick={() => removeRelation(type, invoiceRelationValue.id)}
            sx={{ minWidth: '40px', px: 0 }}
          >
            <RemoveCircleOutline />
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
