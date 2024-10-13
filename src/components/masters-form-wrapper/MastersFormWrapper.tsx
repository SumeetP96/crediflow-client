import { Block, Delete, Save } from '@mui/icons-material';
import { Box, Button, Divider, Grid2, Grid2Props, Paper, Typography } from '@mui/material';
import { FieldComponent, FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ZodValidator, zodValidator } from '@tanstack/zod-form-adapter';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { ReactNode } from 'react';
import { To, useParams } from 'react-router';
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from '../../api/request';
import { parseApiErrorResponse } from '../../api/response';
import { setFormFieldErrors } from '../../helpers/utils/tanstack-form';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { EAppRoutes } from '../../router/routes';
import ApiErrorAlert from '../alerts/ApiErrorAlert';
import { EDialogIds } from '../dialog-provider/constants';
import useDialog from '../dialog-provider/use-dialog';
import Page from '../page/Page';
import FormSkeleton from '../skeleton/FormSkeleton';

export type TCUDAction = 'create' | 'update' | 'delete';

export interface ICRUDAction {
  key: string;
  apiRoute: (id: string | number) => string;
}

export interface IDeleteAction extends ICRUDAction {
  dialogTitle: string;
  dialogBody: string;
}

export interface IMastersFormWrapperProps<Model, FormModel> {
  children?: (
    form: FormApi<FormModel, ZodValidator>,
    field: FieldComponent<FormModel, ZodValidator>,
  ) => ReactNode;
  createTitle: string;
  updateTitle: string;
  heading: string;
  fallbackPrevRoute: EAppRoutes | To;
  defaultValues: (record?: Model | null) => FormModel;
  readRecord: ICRUDAction;
  createRecord: ICRUDAction;
  updateRecord: ICRUDAction;
  deleteRecord: IDeleteAction;
  apiSuccessMessage: (action: TCUDAction) => string;
  successQueryInvalidateKeys: string[];
  createBtnLabel?: string;
  createBtnLoadingLabel?: string;
  updateBtnLabel?: string;
  updateBtnLoadingLabel?: string;
  deleteBtnLabel?: string;
  resetBtnLabel?: string;
  spacing?: Grid2Props['spacing'];
}

export default function MastersFormWrapper<Model, FormModel>({
  children,
  createTitle,
  updateTitle,
  heading,
  fallbackPrevRoute,
  readRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  defaultValues,
  apiSuccessMessage,
  successQueryInvalidateKeys,
  createBtnLabel = 'Create',
  createBtnLoadingLabel = 'Creating...',
  updateBtnLabel = 'Update',
  updateBtnLoadingLabel = 'Updating...',
  deleteBtnLabel = 'Delete',
  resetBtnLabel = 'Cancel',
  spacing = 3,
}: IMastersFormWrapperProps<Model, FormModel>) {
  const { openDialog, closeDialog } = useDialog();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { navigateToPrev } = useNavigateTo(fallbackPrevRoute);

  const params = useParams();

  const id = params.id ? parseInt(params.id, 10) : undefined;

  const isUpdateMode = Boolean(id);

  const findQuery = useQuery({
    queryKey: [readRecord.key],
    queryFn: async () => {
      return await axiosGet<Model>(readRecord.apiRoute(id!));
    },
    enabled: isUpdateMode,
    retry: false,
  });

  const record = isUpdateMode ? findQuery.data?.data : null;

  const handleCUDApiSuccess = (action: TCUDAction) => {
    queryClient.invalidateQueries({ queryKey: successQueryInvalidateKeys });
    navigateToPrev();
    const message = apiSuccessMessage(action);
    enqueueSnackbar(message, { variant: 'success' });
  };

  const handleApiError = (error: AxiosError) => {
    const { fieldErrors = [] } = parseApiErrorResponse(error);
    setFormFieldErrors(form, fieldErrors);
    enqueueSnackbar(error.message, { variant: 'error' });
  };

  const createQuery = useMutation({
    mutationKey: [createRecord.key],
    mutationFn: async (data: FormModel) => {
      return await axiosPost(createRecord.apiRoute(id as number), data);
    },
    onSuccess: () => handleCUDApiSuccess('create'),
    onError: handleApiError,
  });

  const updateQuery = useMutation({
    mutationKey: [updateRecord.key],
    mutationFn: async (data: FormModel) => {
      return await axiosPatch(updateRecord.apiRoute(id as number), data);
    },
    onSuccess: () => handleCUDApiSuccess('update'),
    onError: handleApiError,
  });

  const deleteQuery = useMutation({
    mutationKey: [deleteRecord.key],
    mutationFn: async () => {
      return await axiosDelete(deleteRecord.apiRoute(id as number));
    },
    onSuccess: () => handleCUDApiSuccess('delete'),
  });

  const form = useForm<FormModel, ZodValidator>({
    defaultValues: defaultValues(record),
    onSubmit: async ({ value }) => {
      if (isUpdateMode) {
        await updateQuery.mutateAsync(value);
      } else {
        await createQuery.mutateAsync(value);
      }
    },
    validatorAdapter: zodValidator(),
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const apiError = findQuery.error || createQuery.error || updateQuery.error;

  return (
    <Page title={isUpdateMode ? updateTitle : createTitle}>
      <Paper sx={{ p: 3, width: { xs: '100%', md: '860px' }, mx: 'auto' }} variant="outlined">
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={400} sx={{ mb: 2 }}>
              {heading}
            </Typography>

            <Divider />
          </Box>

          {apiError ? <ApiErrorAlert error={apiError} sx={{ mb: 3 }} /> : null}

          {isUpdateMode && findQuery.isLoading ? (
            <FormSkeleton rows={6} />
          ) : (
            <Grid2 container spacing={spacing}>
              {children?.(form, form.Field)}
            </Grid2>
          )}

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: isUpdateMode ? 'space-between' : 'flex-end',
            }}
          >
            {isUpdateMode ? (
              <>
                <Button
                  variant="outlined"
                  tabIndex={-1}
                  color="error"
                  startIcon={<Delete />}
                  disableElevation
                  onClick={() =>
                    openDialog(EDialogIds.CONFIRMATION, {
                      title: deleteRecord.dialogTitle,
                      body: deleteRecord.dialogBody,
                      onAccept: async () => await deleteQuery.mutateAsync(),
                      onClose: () => closeDialog(),
                    })
                  }
                >
                  {deleteBtnLabel}
                </Button>
              </>
            ) : null}

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 1,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Button
                    disabled={!canSubmit}
                    variant="contained"
                    type="submit"
                    disableElevation
                    startIcon={<Save />}
                  >
                    {isSubmitting
                      ? isUpdateMode
                        ? updateBtnLoadingLabel
                        : createBtnLoadingLabel
                      : isUpdateMode
                        ? updateBtnLabel
                        : createBtnLabel}
                  </Button>

                  <Button
                    variant="contained"
                    color="inherit"
                    type="reset"
                    startIcon={<Block />}
                    disableElevation
                    onClick={() => {
                      form.reset();
                      navigateToPrev();
                    }}
                  >
                    {resetBtnLabel}
                  </Button>
                </Box>
              )}
            />
          </Box>
        </form>
      </Paper>
    </Page>
  );
}
