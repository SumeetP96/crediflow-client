import { Block, Delete, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid2,
  Grid2Props,
  Paper,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormApi, ReactFormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ZodValidator, zodValidator } from '@tanstack/zod-form-adapter';
import { AxiosError } from 'axios';
import { produce } from 'immer';
import { useSnackbar } from 'notistack';
import { ReactNode, useCallback, useMemo, useState } from 'react';
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

export type TCustomErrorMap<FormModel> = Partial<Record<keyof FormModel, string[]>>;

export interface IFormChildrenParams<Model, FormModel> {
  form: ReactFormApi<FormModel, ZodValidator> & FormApi<FormModel, ZodValidator>;
  customFieldErrors: TCustomErrorMap<FormModel>;
  setCustomFieldErrors: <T>(field: keyof TCustomErrorMap<T>, errorMessages: string[]) => void;
  appendCustomFieldErrors: <T>(field: keyof TCustomErrorMap<T>, errorMessages: string[]) => void;
  isUpdateMode: boolean;
  findData?: Model;
}

export interface IFormWrapperProps<Model, FormModel> {
  children?: (params: IFormChildrenParams<Model, FormModel>) => ReactNode;
  createTitle: string;
  updateTitle: string;
  heading: string;
  fallbackPrevRoute: EAppRoutes | To;
  defaultValues: (record?: Model | null) => FormModel;
  readRecord: ICRUDAction;
  createRecord: ICRUDAction;
  updateRecord: ICRUDAction;
  deleteRecord?: IDeleteAction;
  apiSuccessMessage: (action: TCUDAction) => string;
  successQueryInvalidateKeys: string[];
  customFieldErrors?: TCustomErrorMap<FormModel>;
  createBtnLabel?: string;
  createBtnLoadingLabel?: string;
  updateBtnLabel?: string;
  updateBtnLoadingLabel?: string;
  deleteBtnLabel?: string;
  resetBtnLabel?: string;
  spacing?: Grid2Props['spacing'];
  paperSx?: SxProps;
  transformValues?: (values: FormModel) => Record<string, any>;
  isSubmitDisabled?: boolean;
}

export default function FormWrapper<Model, FormModel>({
  children,
  createTitle,
  updateTitle,
  heading,
  fallbackPrevRoute,
  readRecord,
  createRecord,
  updateRecord,
  deleteRecord = { key: '', apiRoute: () => '', dialogTitle: '', dialogBody: '' },
  defaultValues,
  apiSuccessMessage,
  successQueryInvalidateKeys,
  customFieldErrors,
  createBtnLabel = 'Create',
  createBtnLoadingLabel = 'Creating...',
  updateBtnLabel = 'Update',
  updateBtnLoadingLabel = 'Updating...',
  deleteBtnLabel = 'Delete',
  resetBtnLabel = 'Cancel',
  spacing = 3,
  paperSx = {},
  transformValues,
  isSubmitDisabled = false,
}: IFormWrapperProps<Model, FormModel>) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    onError: (error: AxiosError) => {
      const { message } = parseApiErrorResponse(error);
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const form = useForm<FormModel, ZodValidator>({
    defaultValues: defaultValues(record),
    onSubmit: async ({ value }) => {
      const transformedValues = transformValues ? transformValues(value) : value;
      console.log(
        '-- 🚀 ~ file: FormWrapper.tsx:181 ~ onSubmit: ~ transformedValues:',
        transformedValues,
      );
      // if (isUpdateMode) {
      //   await updateQuery.mutateAsync(transformedValues as FormModel);
      // } else {
      //   await createQuery.mutateAsync(transformedValues as FormModel);
      // }
    },
    validatorAdapter: zodValidator(),
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const apiError = findQuery.error || createQuery.error || updateQuery.error;

  const [customFormFieldErrors, setCustomFormFieldErrors] = useState<TCustomErrorMap<FormModel>>(
    customFieldErrors || ({} as TCustomErrorMap<FormModel>),
  );

  const updateCustomFieldErrors = useCallback(function <T = FormModel>(
    field: keyof TCustomErrorMap<T>,
    errorMessages: string[],
  ) {
    setCustomFormFieldErrors(
      produce((draft: unknown) => {
        (draft as TCustomErrorMap<T>)[field] = errorMessages;
      }),
    );
  }, []);

  const appendCustomFieldErrors = useCallback(function <T = FormModel>(
    field: keyof TCustomErrorMap<T>,
    errorMessages: string[],
  ) {
    setCustomFormFieldErrors(
      produce((draft: unknown) => {
        (draft as TCustomErrorMap<T>)[field] = (draft as TCustomErrorMap<T>)[field]?.concat(
          errorMessages,
        );
      }),
    );
  }, []);

  const hasCustomErrors = useMemo(() => {
    const normalizedFields = customFormFieldErrors ?? ({} as TCustomErrorMap<FormModel>);
    const activeError = Object.keys(normalizedFields).find((field) => {
      if (normalizedFields[field as keyof TCustomErrorMap<FormModel>]?.length) {
        return true;
      }
    });
    return Boolean(activeError);
  }, [customFormFieldErrors]);

  const submitForm = () => {
    form.handleSubmit();
  };

  return (
    <Page title={isUpdateMode ? updateTitle : createTitle}>
      <Paper
        sx={{
          px: { xs: 2, md: 3 },
          py: 3,
          width: { xs: '100%', md: '860px' },
          mx: 'auto',
          ...paperSx,
        }}
        variant="outlined"
      >
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
              {children?.({
                form,
                customFieldErrors: customFormFieldErrors || ({} as TCustomErrorMap<FormModel>),
                setCustomFieldErrors: updateCustomFieldErrors,
                appendCustomFieldErrors,
                isUpdateMode,
                findData: findQuery.data?.data,
              })}
            </Grid2>
          )}

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: isUpdateMode ? 'space-between' : 'flex-end',
            }}
          >
            {isUpdateMode && deleteRecord.key ? (
              <>
                <Button
                  variant="outlined"
                  tabIndex={-1}
                  color="error"
                  startIcon={isMobile ? null : <Delete />}
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
                  {isMobile ? <Delete /> : deleteBtnLabel}
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
                    disabled={!canSubmit || hasCustomErrors || isSubmitDisabled}
                    variant="contained"
                    onClick={submitForm}
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
