import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ReactNode } from 'react';

export interface IInformationDialogProps {
  title: string;
  body: ReactNode;
  open: boolean;
  onClose: () => void;
  acceptLabel?: string;
  onAccept?: () => void;
  closeOnAccept?: boolean;
}

export default function InformationDialog({
  title,
  body,
  open,
  onClose,
  acceptLabel = 'Yes',
  onAccept,
  closeOnAccept = true,
}: IInformationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          autoFocus
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
