import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Tooltip } from '@mui/material';
import { useInvoiceFormStore } from '../store';
import { EInvoiceRelation } from '../types';
import InvoiceRelationsInput from './InvoiceRelationsInput';

export interface IInvoiceRelationsProps {
  type: EInvoiceRelation;
  inputLabel: string;
  addTooltip: string;
  addButtonLabel: string;
  removeTooltip: string;
}

export default function InvoiceRelations({
  type,
  inputLabel,
  addTooltip,
  addButtonLabel,
  removeTooltip,
}: IInvoiceRelationsProps) {
  const { invoiceRelations, addEmptyRelation } = useInvoiceFormStore();

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      {invoiceRelations[type].map((invoiceRelationValue, i) => (
        <InvoiceRelationsInput
          key={`${type}-${invoiceRelationValue.id}`}
          index={i}
          type={type}
          label={inputLabel}
          removeTooltipText={removeTooltip}
          invoiceRelationValue={invoiceRelationValue}
        />
      ))}

      <Tooltip title={addTooltip}>
        <Button
          disableElevation
          startIcon={<AddCircleOutline />}
          sx={{ mt: 1 }}
          onClick={() => addEmptyRelation(type)}
        >
          {addButtonLabel}
        </Button>
      </Tooltip>
    </Grid2>
  );
}
