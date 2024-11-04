import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useInvoiceFormStore } from '../store';
import { EInvoiceRelation } from '../types';
import InvoiceRelationsInput from './InvoiceRelationsInput';

export interface IInvoiceRelationsProps {
  disabled: boolean;
  type: EInvoiceRelation;
  inputLabel: string;
  addTooltip: string;
  addButtonLabel: string;
  removeTooltip: string;
  invoiceCustomerId?: number;
}

export default function InvoiceRelations({
  disabled,
  type,
  inputLabel,
  addTooltip,
  addButtonLabel,
  removeTooltip,
  invoiceCustomerId,
}: IInvoiceRelationsProps) {
  const invoiceRelations = useInvoiceFormStore((state) => state.invoiceRelations);
  const addEmptyRelation = useInvoiceFormStore((state) => state.addEmptyRelation);
  const removeRelation = useInvoiceFormStore((state) => state.removeRelation);

  useEffect(() => {
    if (invoiceCustomerId) {
      removeRelation(type, invoiceCustomerId);
    }
  }, [invoiceCustomerId, removeRelation, type]);

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      {invoiceRelations[type].map((invoiceRelationValue, i) => (
        <InvoiceRelationsInput
          key={`${type}-${invoiceRelationValue.id}`}
          index={i}
          disabled={disabled}
          type={type}
          label={inputLabel}
          removeTooltipText={removeTooltip}
          invoiceRelationValue={invoiceRelationValue}
          invoiceCustomerId={invoiceCustomerId}
        />
      ))}

      <Tooltip title={addTooltip}>
        <span>
          <Button
            disabled={disabled}
            disableElevation
            startIcon={<AddCircleOutline />}
            sx={{ mt: 1 }}
            onClick={() => addEmptyRelation(type)}
          >
            {addButtonLabel}
          </Button>
        </span>
      </Tooltip>
    </Grid2>
  );
}
