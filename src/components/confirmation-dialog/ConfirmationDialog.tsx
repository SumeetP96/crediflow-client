import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface IConfirmationDialogProps {
  title: string;
  body: string;
  open: boolean;
  onClose: () => void;
  acceptLabel?: string;
  onAccept?: () => void;
  closeOnAccept?: boolean;
  rejectLabel?: string;
  onReject?: () => void;
  closeOnReject?: boolean;
  autofocusOn?: 'accept' | 'reject';
}

export default function ConfirmationDialog({
  title,
  body,
  open,
  onClose,
  acceptLabel = 'Yes',
  onAccept,
  closeOnAccept = true,
  rejectLabel = 'No',
  onReject,
  closeOnReject = true,
  autofocusOn = 'reject',
}: IConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus={autofocusOn === 'reject'}
          color="error"
          disableElevation
          onClick={() => {
            onReject?.();
            if (closeOnReject) {
              onClose();
            }
          }}
        >
          {rejectLabel}
        </Button>

        <Button
          variant="contained"
          disableElevation
          autoFocus={autofocusOn === 'accept'}
          onClick={() => {
            onAccept?.();
            if (closeOnAccept) {
              onClose();
            }
          }}
        >
          {acceptLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
