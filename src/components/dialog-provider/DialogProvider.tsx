import { createContext, ReactNode, useCallback, useState } from 'react';
import ConfirmationDialog, {
  IConfirmationDialogProps,
} from '../confirmation-dialog/ConfirmationDialog';
import { EDialogIds } from './constants';

type TDialogProps = Omit<IConfirmationDialogProps, 'open'>;

export interface IDialogContextState {
  dialogId: EDialogIds | null;
}

export interface IDialogContextActions {
  openDialog: (id: EDialogIds, props: TDialogProps) => void;
  closeDialog: () => void;
}

export type TDialogContext = IDialogContextState & IDialogContextActions;

export const DialogContext = createContext<TDialogContext | null>(null);

export interface IDialogProviderProps {
  children: ReactNode;
}

export default function DialogProvider({ children }: IDialogProviderProps) {
  const [dialogId, setDialogId] = useState<EDialogIds | null>(null);

  const [dialogProps, setDialogProps] = useState<TDialogProps>();

  const openDialog = useCallback((id: EDialogIds, props: TDialogProps) => {
    setDialogId(id);
    setDialogProps(props);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogId(null);
  }, []);

  const state: IDialogContextState = {
    dialogId,
  };

  const actions: IDialogContextActions = {
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={{ ...state, ...actions }}>
      <ConfirmationDialog {...dialogProps!} open={dialogId === EDialogIds.CONFIRMATION} />

      {children}
    </DialogContext.Provider>
  );
}
