import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Button, FormControl, Grid2, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import FormLabel from '../../../components/form-label/FormLabel';
import { useInvoiceFormStore } from '../store';

export default function InvoicePayments() {
  const invoiceItems = useInvoiceFormStore((state) => state.invoiceItems);
  const invoicePayments = useInvoiceFormStore((state) => state.invoicePayments);
  const updateInvoicePayment = useInvoiceFormStore((state) => state.updateInvoicePayment);
  const addEmptyInvoicePayment = useInvoiceFormStore((state) => state.addEmptyInvoicePayment);
  const removeInvoicePayment = useInvoiceFormStore((state) => state.removeInvoicePayment);

  const netTotal = useMemo(() => {
    const grossTotal = invoiceItems.reduce((acc, cur) => acc + cur.amount, 0);
    const paymentsTotal = invoicePayments.reduce((acc, cur) => acc + cur.amount, 0);
    return (grossTotal - paymentsTotal).toFixed(2);
  }, [invoiceItems, invoicePayments]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={{ xs: 3, md: 1 }}>
      {invoicePayments.map((payment, i) => (
        <Box key={payment.uid} width="100%" display="flex" alignItems="flex-start" gap={1}>
          <Grid2 container spacing={{ xs: 1.5, md: 3 }} flexGrow={1}>
            {/* Remarks */}
            <Grid2 size={{ xs: 12, md: 10 }}>
              <FormControl fullWidth>
                <TextField
                  id={`payment-remarks-${payment.uid}`}
                  label={<FormLabel label="Remarks" required />}
                  variant="outlined"
                  value={payment.remarks}
                  onChange={(e) => updateInvoicePayment(i, 'remarks', e.target.value)}
                  placeholder="Enter payment remarks"
                />
              </FormControl>
            </Grid2>

            {/* Amount */}
            <Grid2 size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id={`payment-amount-${payment.uid}`}
                  type="number"
                  label={<FormLabel label="Amount" required />}
                  variant="outlined"
                  value={payment.amount ? Number(payment.amount) : 0}
                  onChange={(e) => updateInvoicePayment(i, 'amount', e.target.value)}
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
            onClick={() => removeInvoicePayment(payment.uid)}
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
          onClick={() => addEmptyInvoicePayment()}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          Add Payment
        </Button>

        <Grid2
          container
          spacing={3}
          sx={{
            py: 1,
            px: 3,
            bgcolor: (theme) => theme.palette.background.default,
            borderRadius: '12px',
            width: '100%',
          }}
        >
          <Grid2 size={{ xs: 6, md: 10 }}>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              textAlign={{ xs: 'left', md: 'right' }}
            >
              Net Total
            </Typography>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" fontWeight={500} textAlign="right">
              {netTotal}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
