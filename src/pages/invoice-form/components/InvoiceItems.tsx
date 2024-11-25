import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  Grid2Props,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { z, ZodSchema } from 'zod';
import FormLabel from '../../../components/form-label/FormLabel';
import { IInvoiceItem } from '../../invoices-listing/types';
import { useInvoiceFormStore } from '../store';

function TotalGridContainer({
  children,
  spacing = 3,
  sx,
}: {
  children: ReactNode;
  spacing?: Grid2Props['spacing'];
  sx?: SxProps;
}) {
  return (
    <Grid2
      container
      spacing={spacing}
      sx={{
        py: 0.75,
        px: 3,
        mt: { xs: 3, md: 1 },
        bgcolor: (theme) => theme.palette.background.default,
        borderRadius: '12px',
        width: '100%',
        ...(sx ? sx : {}),
      }}
    >
      {children}
    </Grid2>
  );
}

function TotalLabel({ label }: { label: string }) {
  return (
    <Typography variant="subtitle1" fontWeight={500} textAlign={{ xs: 'left', md: 'right' }}>
      {label}
    </Typography>
  );
}

function DeductionGridContainer({
  children,
  spacing = 2,
  sx,
}: {
  children: ReactNode;
  spacing?: Grid2Props['spacing'];
  sx?: SxProps;
}) {
  return (
    <Grid2
      container
      spacing={spacing}
      sx={{
        py: 1,
        mt: { xs: 3, md: 1 },
        width: '100%',
        ...(sx ? sx : {}),
      }}
      alignItems="center"
    >
      {children}
    </Grid2>
  );
}

function DeductionLabel({ label }: { label: string }) {
  return (
    <Typography
      variant="subtitle1"
      textAlign={{ xs: 'left', md: 'right' }}
      sx={{
        mr: { xs: 0, md: 2 },
        ml: { xs: 3, md: 0 },
      }}
    >
      {label}
    </Typography>
  );
}

const nameSchema = z.string().min(2, 'Min 2 characters').max(50, 'Max 50 characters');
const numberSchema = z.number().positive('Should be greater than 0').safe();
const numberOptionalSchema = z.number().positive('Should be greater than 0').safe().optional();

export default function InvoiceItems({ disabled = false }: { disabled?: boolean }) {
  const {
    errorMap,
    setError,
    removeError,
    invoiceItems,
    updateInvoiceItem,
    addEmptyInvoiceItem,
    removeInvoiceItem,
    discount,
    setDiscount,
    payment,
    setPayment,
  } = useInvoiceFormStore();

  const calculateAmount = (price: number | undefined, quantity: number | undefined) => {
    const safePrice = price ? Number(price) : undefined;
    const safeQuantity = quantity ? Number(quantity) : undefined;

    if (!(safePrice && safeQuantity)) {
      return 0;
    }

    return Number(((safePrice * safeQuantity * 100) / 100).toFixed(2));
  };

  const grossTotal = useMemo(() => {
    return invoiceItems.reduce((acc, cur) => acc + parseFloat(String(cur.amount)), 0);
  }, [invoiceItems]);

  const netTotal = useMemo(() => {
    const safeDiscount = discount ? parseFloat(discount) : 0;
    const safePayment = payment ? parseFloat(payment) : 0;
    return grossTotal - safeDiscount - safePayment;
  }, [discount, grossTotal, payment]);

  const isDeductionEnabled = useMemo(() => {
    return invoiceItems.find((i) => !!i.name);
  }, [invoiceItems]);

  const validateInvoiceItemInput = (
    field: keyof IInvoiceItem | 'discount' | 'payment',
    value: string | number,
    schema: ZodSchema,
  ) => {
    const validated = schema.safeParse(value);
    if (validated.success === false) {
      setError(field, validated.error.errors[0].message);
    } else {
      removeError(field);
    }
  };

  const handleInvoiceItemChange = (
    index: number,
    field: keyof IInvoiceItem,
    value: string | number,
    schema: ZodSchema,
  ) => {
    validateInvoiceItemInput(field, value, schema);
    updateInvoiceItem(index, field, String(value));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={{ xs: 3, md: 1 }}>
      {invoiceItems.map((item, i) => (
        <Box key={item.uid} width="100%" display="flex" alignItems="flex-start" gap={1}>
          <Grid2 container spacing={{ xs: 1.5, md: 3 }} flexGrow={1}>
            {/* Name */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id={`item-name-${item.uid}`}
                  disabled={disabled}
                  label={<FormLabel label="Item" required />}
                  variant="outlined"
                  value={item.name}
                  placeholder="Enter item name"
                  onBlur={(e) => validateInvoiceItemInput('name', e.target.value, nameSchema)}
                  onChange={(e) => handleInvoiceItemChange(i, 'name', e.target.value, nameSchema)}
                  helperText={errorMap.name}
                  error={Boolean(errorMap.name)}
                />
              </FormControl>
            </Grid2>

            {/* Quantity */}
            <Grid2 size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id={`item-quantity-${item.uid}`}
                  type="number"
                  disabled={!item.name}
                  label={<FormLabel label="Quantity" required />}
                  variant="outlined"
                  value={item.quantity ? parseFloat(String(item.quantity)) : 0}
                  placeholder="0.00"
                  slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
                  onBlur={(e) =>
                    validateInvoiceItemInput(
                      'quantity',
                      parseFloat(e.target.value ?? 0),
                      numberSchema,
                    )
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    handleInvoiceItemChange(i, 'quantity', parseFloat(value ?? 0), numberSchema);
                    if (item.price) {
                      handleInvoiceItemChange(
                        i,
                        'amount',
                        String(parseFloat(value) * parseFloat(String(item.price))),
                        numberSchema,
                      );
                    }
                  }}
                  helperText={errorMap.quantity}
                  error={Boolean(errorMap.quantity)}
                />
              </FormControl>
            </Grid2>

            {/* Price */}
            <Grid2 size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id={`item-price-${item.uid}`}
                  type="number"
                  disabled={!item.name}
                  label={<FormLabel label="Price" required />}
                  variant="outlined"
                  value={item.price ? parseFloat(String(item.price)) : 0}
                  placeholder="0.00"
                  slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
                  onBlur={(e) =>
                    validateInvoiceItemInput('price', parseFloat(e.target.value ?? 0), numberSchema)
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    handleInvoiceItemChange(i, 'price', parseFloat(value ?? 0), numberSchema);
                    if (item.price) {
                      handleInvoiceItemChange(
                        i,
                        'amount',
                        String(parseFloat(value) * parseFloat(String(item.quantity))),
                        numberSchema,
                      );
                    }
                  }}
                  helperText={errorMap.price}
                  error={Boolean(errorMap.price)}
                />
              </FormControl>
            </Grid2>

            {/* Amount */}
            <Grid2 size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id={`item-amount-${item.uid}`}
                  type="number"
                  disabled
                  label={<FormLabel label="Amount" />}
                  variant="outlined"
                  value={calculateAmount(item.price, item.quantity)}
                  placeholder="0.00"
                  slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
                />
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Remove */}
          <Button
            disableElevation
            size="large"
            color="error"
            tabIndex={-1}
            onClick={() => removeInvoiceItem(item.uid)}
            sx={{ minWidth: '40px', px: 0, mt: 0.85 }}
          >
            <RemoveCircleOutline />
          </Button>
        </Box>
      ))}

      <Box pr="45px" width="100%">
        <Button
          variant="text"
          startIcon={<AddCircleOutline />}
          onClick={() => addEmptyInvoiceItem()}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          Add Item
        </Button>

        {/* Gross Total */}
        <TotalGridContainer>
          <Grid2 size={{ xs: 6, md: 10 }}>
            <TotalLabel label="Gross Total" />
          </Grid2>

          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight={500} textAlign="right">
              {Number(grossTotal).toFixed(2)}
            </Typography>
          </Grid2>
        </TotalGridContainer>

        {/* Deductions */}
        <DeductionGridContainer>
          {/* Discount */}
          <Grid2 size={{ xs: 6, md: 10 }}>
            <DeductionLabel label="Discount (-)" />
          </Grid2>

          <Grid2 size={{ xs: 6, md: 2 }}>
            <FormControl fullWidth>
              <TextField
                id="discount"
                type="number"
                disabled={!isDeductionEnabled}
                label={<FormLabel label="Discount" />}
                variant="outlined"
                value={discount ? parseFloat(discount) : 0}
                placeholder="0.00"
                slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
                onBlur={(e) =>
                  validateInvoiceItemInput(
                    'discount',
                    parseFloat(e.target.value ?? 0),
                    numberOptionalSchema,
                  )
                }
                onChange={(e) => {
                  validateInvoiceItemInput(
                    'discount',
                    parseFloat(e.target.value ?? 0),
                    numberOptionalSchema,
                  );
                  setDiscount(e.target.value);
                }}
                helperText={errorMap.discount}
                error={Boolean(errorMap.discount)}
              />
            </FormControl>
          </Grid2>

          {/* Advance Payment */}
          <Grid2 size={{ xs: 6, md: 10 }}>
            <DeductionLabel label="Payment (-)" />
          </Grid2>

          <Grid2 size={{ xs: 6, md: 2 }}>
            <FormControl fullWidth>
              <TextField
                id="payment"
                type="number"
                disabled={!isDeductionEnabled}
                label={<FormLabel label="Payment" />}
                variant="outlined"
                value={payment ? parseFloat(payment) : 0}
                placeholder="0.00"
                slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
                onBlur={(e) =>
                  validateInvoiceItemInput(
                    'payment',
                    parseFloat(e.target.value ?? 0),
                    numberOptionalSchema,
                  )
                }
                onChange={(e) => {
                  validateInvoiceItemInput(
                    'payment',
                    parseFloat(e.target.value ?? 0),
                    numberOptionalSchema,
                  );
                  setPayment(e.target.value);
                }}
                helperText={errorMap.payment}
                error={Boolean(errorMap.payment)}
              />
            </FormControl>
          </Grid2>
        </DeductionGridContainer>

        {/* Net Total */}
        <TotalGridContainer>
          <Grid2 size={{ xs: 6, md: 10 }}>
            <TotalLabel label="Net Total" />
          </Grid2>

          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight={500} textAlign="right">
              {Number(netTotal).toFixed(2)}
            </Typography>
          </Grid2>
        </TotalGridContainer>
      </Box>
    </Box>
  );
}
