import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Button, FormControl, Grid2, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import FormLabel from '../../../components/form-label/FormLabel';
import { useInvoiceFormStore } from '../store';

export default function InvoiceItems() {
  const invoiceItems = useInvoiceFormStore((state) => state.invoiceItems);
  const updateInvoiceItem = useInvoiceFormStore((state) => state.updateInvoiceItem);
  const addEmptyInvoiceItem = useInvoiceFormStore((state) => state.addEmptyInvoiceItem);
  const removeInvoiceItem = useInvoiceFormStore((state) => state.removeInvoiceItem);

  const calculateAmount = (price: number | undefined, quantity: number | undefined) => {
    const safePrice = price ? Number(price) : undefined;
    const safeQuantity = quantity ? Number(quantity) : undefined;

    if (!(safePrice && safeQuantity)) {
      return 0;
    }

    return Number(((safePrice * safeQuantity * 100) / 100).toFixed(2));
  };

  const totalQuantity = useMemo(() => {
    return invoiceItems.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [invoiceItems]);

  const totalAmount = useMemo(() => {
    return invoiceItems.reduce((acc, cur) => acc + cur.amount, 0);
  }, [invoiceItems]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1.5}>
      {invoiceItems.map((item, i) => (
        <Box key={item.uid} width="100%" display="flex" alignItems="flex-start" gap={1}>
          <Grid2 container spacing={3} flexGrow={1}>
            {/* Name */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <TextField
                  id={`item-name-${item.uid}`}
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
                  label={<FormLabel label="Quantity" />}
                  variant="outlined"
                  value={item.quantity ? Number(item.quantity) : ''}
                  onChange={(e) => updateInvoiceItem(i, 'quantity', e.target.value)}
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
                  label={<FormLabel label="Price" />}
                  variant="outlined"
                  value={item.price ? Number(item.price) : ''}
                  onChange={(e) => updateInvoiceItem(i, 'price', e.target.value)}
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

      <Button
        variant="text"
        startIcon={<AddCircleOutline />}
        sx={{ mt: 0.5 }}
        onClick={() => addEmptyInvoiceItem()}
      >
        Add Item
      </Button>

      <Grid2
        container
        spacing={3}
        sx={{
          py: 1,
          px: 2,
          bgcolor: (theme) => theme.palette.background.default,
          borderRadius: '12px',
          width: '100%',
        }}
      >
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Typography variant="subtitle2">Total</Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 2 }}>
          <Typography variant="subtitle2" textAlign="right" mr={1}>
            {Number(totalQuantity).toFixed(2)}
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 2 }} />

        <Grid2 size={{ xs: 12, md: 2 }}>
          <Typography variant="subtitle2" textAlign="right" mr={1}>
            {Number(totalAmount).toFixed(2)}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}
