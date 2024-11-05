import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
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
  placeholder?: string;
}

export default function InvoiceRelations({
  disabled,
  type,
  inputLabel,
  addButtonLabel,
  invoiceCustomerId,
  placeholder,
}: IInvoiceRelationsProps) {
  const invoiceRelations = useInvoiceFormStore((state) => state.invoiceRelations);
  const addEmptyRelation = useInvoiceFormStore((state) => state.addEmptyRelation);
  const removeRelation = useInvoiceFormStore((state) => state.removeRelation);

  useEffect(() => {
    if (invoiceCustomerId) {
      const matchingRelation = invoiceRelations.customers.find((r) => r.id === invoiceCustomerId);
      if (matchingRelation) {
        removeRelation(type, matchingRelation.uid);
      }
    }
  }, [invoiceCustomerId, invoiceRelations.customers, removeRelation, type]);

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      {invoiceRelations[type].map((invoiceRelationValue, i) => (
        <InvoiceRelationsInput
          key={`${type}-${invoiceRelationValue.uid}`}
          index={i}
          disabled={disabled}
          type={type}
          label={inputLabel}
          invoiceRelationValue={invoiceRelationValue}
          invoiceCustomerId={invoiceCustomerId}
          placeholder={placeholder}
        />
      ))}

      <Button
        disabled={disabled}
        disableElevation
        startIcon={<AddCircleOutline />}
        sx={{ mt: 0.5 }}
        onClick={() => addEmptyRelation(type)}
      >
        {addButtonLabel}
      </Button>
    </Grid2>
  );
}
