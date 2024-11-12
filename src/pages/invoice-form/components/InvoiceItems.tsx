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
import FormLabel from '../../../components/form-label/FormLabel';
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

export default function InvoiceItems({ disabled = false }: { disabled?: boolean }) {
  const invoiceItems = useInvoiceFormStore((state) => state.invoiceItems);
  const updateInvoiceItem = useInvoiceFormStore((state) => state.updateInvoiceItem);
  const addEmptyInvoiceItem = useInvoiceFormStore((state) => state.addEmptyInvoiceItem);
  const removeInvoiceItem = useInvoiceFormStore((state) => state.removeInvoiceItem);
  const discount = useInvoiceFormStore((state) => state.discount);
  const setDiscount = useInvoiceFormStore((state) => state.setDiscount);
  const payment = useInvoiceFormStore((state) => state.payment);
  const setPayment = useInvoiceFormStore((state) => state.setPayment);

  const calculateAmount = (price: number | undefined, quantity: number | undefined) => {
    const safePrice = price ? Number(price) : undefined;
    const safeQuantity = quantity ? Number(quantity) : undefined;

    if (!(safePrice && safeQuantity)) {
      return 0;
    }

    return Number(((safePrice * safeQuantity * 100) / 100).toFixed(2));
  };

  const grossTotal = useMemo(() => {
    return invoiceItems.reduce((acc, cur) => acc + cur.amount, 0);
  }, [invoiceItems]);

  const netTotal = useMemo(() => {
    const safeDiscount = discount ? parseFloat(discount) : 0;
    const safePayment = payment ? parseFloat(payment) : 0;
    return grossTotal - safeDiscount - safePayment;
  }, [discount, grossTotal, payment]);

  const isDeductionEnabled = useMemo(() => {
    return invoiceItems.find((i) => !!i.name);
  }, [invoiceItems]);

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
                  onChange={(e) => updateInvoiceItem(i, 'name', e.target.value)}
                  placeholder="Enter item name"
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
                  label={<FormLabel label="Quantity" />}
                  variant="outlined"
                  value={item.quantity ? Number(item.quantity) : ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    updateInvoiceItem(i, 'quantity', value);
                    if (item.price) {
                      updateInvoiceItem(i, 'amount', String(Number(value) * item.price));
                    }
                  }}
                  placeholder="0.00"
                  slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
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
                  label={<FormLabel label="Price" />}
                  variant="outlined"
                  value={item.price ? Number(item.price) : ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    updateInvoiceItem(i, 'price', value);
                    if (item.quantity) {
                      updateInvoiceItem(i, 'amount', String(Number(value) * item.quantity));
                    }
                  }}
                  placeholder="0.00"
                  slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
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
                  label={<FormLabel label="Amount" required />}
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
                value={discount ? parseFloat(discount) : ''}
                onChange={(e) => setDiscount(String(e.target.value))}
                placeholder="0.00"
                slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
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
                value={payment ? parseFloat(payment) : ''}
                onChange={(e) => setPayment(String(e.target.value))}
                placeholder="0.00"
                slotProps={{ htmlInput: { style: { textAlign: 'right' } } }}
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
