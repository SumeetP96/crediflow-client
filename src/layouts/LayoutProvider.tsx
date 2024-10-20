import { ReactNode } from 'react';
import DialogProvider from '../components/dialog-provider/DialogProvider';
import SettingsDrawer from '../components/settings-drawer/SettingsDrawer';
import useQueryParams from '../helpers/hooks/use-query-params';
import { EQueryParamKeys } from '../helpers/types';
import { useCurrentLayout } from './hooks/use-current-layout';

export interface ILayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
  const { getSingleSearchParam, setSearchParams } = useQueryParams();

  const isSettingsDrawerOpen = getSingleSearchParam(EQueryParamKeys.SETTINGS_DRAWER) === true;

  const currentLayout = useCurrentLayout();

  const Provider = currentLayout.provider;

  return (
    <Provider>
      <SettingsDrawer
        open={isSettingsDrawerOpen}
        onClose={() => setSearchParams({ [EQueryParamKeys.SETTINGS_DRAWER]: null })}
      />

      <DialogProvider>{children}</DialogProvider>
    </Provider>
  );
};
