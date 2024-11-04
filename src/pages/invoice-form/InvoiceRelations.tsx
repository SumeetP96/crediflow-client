import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid2, TextField, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  EInvoiceRelation,
  IInvoiceRelations,
  IInvoiceRelationValue,
  TInvoiceAgentOption,
  TInvoiceCustomerOption,
} from './types';

export interface IInvoiceRelationsInputProps {
  type: EInvoiceRelation;
  index: number;
  options: TInvoiceCustomerOption[] | TInvoiceAgentOption[];
  invoiceRelationValue: IInvoiceRelationValue;
  invoiceRelations: IInvoiceRelations;
  onAddRelation: (type: EInvoiceRelation, index: number, id: number) => void;
  onRemoveRelation: (type: EInvoiceRelation, id: number) => void;
  label: string;
  removeTooltipText: string;
}

function InvoiceRelationsInput({
  type,
  index,
  invoiceRelationValue,
  options,
  invoiceRelations,
  onAddRelation,
  onRemoveRelation,
  label,
  removeTooltipText,
}: IInvoiceRelationsInputProps) {
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
        onChange={(_, selection) => onAddRelation(type, index, selection?.value as number)}
        renderInput={(params) => <TextField {...params} label={label} />}
        sx={{ flexGrow: 1 }}
      />

      <Tooltip title={removeTooltipText}>
        <Button
          disableElevation
          size="large"
          color="error"
          onClick={() => onRemoveRelation(type, invoiceRelationValue.id)}
          sx={{ minWidth: '40px', px: 0 }}
        >
          <RemoveCircleOutline />
        </Button>
      </Tooltip>
    </Box>
  );
}

export interface IInvoiceRelationsProps
  extends Pick<
    IInvoiceRelationsInputProps,
    'invoiceRelations' | 'onAddRelation' | 'onRemoveRelation'
  > {
  customerOptions: TInvoiceCustomerOption[];
  agentOptions: TInvoiceAgentOption[];
  onAddEmptyRelation: (type: EInvoiceRelation) => void;
}

export default function InvoiceRelations({
  agentOptions,
  customerOptions,
  invoiceRelations,
  onAddRelation,
  onRemoveRelation,
  onAddEmptyRelation,
}: IInvoiceRelationsProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoice Relations
      </Typography>

      <Grid2 container spacing={4}>
        {/* Customers */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          {invoiceRelations.customers.map((relValue, i) => (
            <InvoiceRelationsInput
              key={`customers-${relValue.id}`}
              index={i}
              label="Customer"
              removeTooltipText="Remove customer"
              type={EInvoiceRelation.CUSTOMERS}
              invoiceRelationValue={relValue}
              options={customerOptions}
              invoiceRelations={invoiceRelations}
              onAddRelation={onAddRelation}
              onRemoveRelation={onRemoveRelation}
            />
          ))}

          <Button
            disableElevation
            startIcon={<AddCircleOutline />}
            sx={{ mt: 1 }}
            onClick={() => onAddEmptyRelation(EInvoiceRelation.CUSTOMERS)}
          >
            Add Customer
          </Button>
        </Grid2>

        {/* Agents */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          {invoiceRelations.agents.map((relValue, i) => (
            <InvoiceRelationsInput
              key={`agents-${relValue.id}`}
              index={i}
              label="Agent"
              removeTooltipText="Remove agent"
              type={EInvoiceRelation.AGENTS}
              invoiceRelationValue={relValue}
              options={agentOptions}
              invoiceRelations={invoiceRelations}
              onAddRelation={onAddRelation}
              onRemoveRelation={onRemoveRelation}
            />
          ))}

          <Button
            disableElevation
            startIcon={<AddCircleOutline />}
            sx={{ mt: 1 }}
            onClick={() => onAddEmptyRelation(EInvoiceRelation.AGENTS)}
          >
            Add Agent
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
