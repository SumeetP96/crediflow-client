import { RemoveCircleOutline } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useInvoiceFormStore } from '../store';
import { EInvoiceRelation, IInvoiceRelationValue } from '../types';

export interface IInvoiceRelationsInputProps {
  type: EInvoiceRelation;
  index: number;
  invoiceRelationValue: IInvoiceRelationValue;
  label: string;
  removeTooltipText: string;
}

export default function InvoiceRelationsInput({
  type,
  index,
  invoiceRelationValue,
  label,
  removeTooltipText,
}: IInvoiceRelationsInputProps) {
  const { customerOptions, agentOptions, invoiceRelations, addRelation, removeRelation } =
    useInvoiceFormStore();

  const optionMap = {
    [EInvoiceRelation.CUSTOMERS]: customerOptions,
    [EInvoiceRelation.AGENTS]: agentOptions,
  };

  const options = optionMap[type];

  const availableOptions = useMemo(() => {
    return options.filter(
      (option) =>
        option.value === invoiceRelationValue.id ||
        !invoiceRelations[type].find((rel) => rel.id === option.value),
    );
  }, [invoiceRelationValue.id, invoiceRelations, options, type]);

  return (
    <Box mt={2} display="flex" alignItems="center" gap={1} width="100%">
      <Autocomplete
        id={`${type}-${invoiceRelationValue.id}`}
        value={availableOptions.find((opt) => opt.value === invoiceRelationValue.id) ?? null}
        options={availableOptions}
        onChange={(_, selection) => addRelation(type, index, selection?.value as number)}
        renderInput={(params) => <TextField {...params} label={label} />}
        sx={{ flexGrow: 1 }}
      />

      <Tooltip title={removeTooltipText}>
        <Button
          disableElevation
          size="large"
          color="error"
          onClick={() => removeRelation(type, invoiceRelationValue.id)}
          sx={{ minWidth: '40px', px: 0 }}
        >
          <RemoveCircleOutline />
        </Button>
      </Tooltip>
    </Box>
  );
}
