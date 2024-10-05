import { ReactNode } from 'react';
import DialogProvider from '../components/dialog-provider/DialogProvider';
import SettingsDrawer from '../components/settings-drawer/SettingsDrawer';
import useQueryParams from '../helpers/hooks/use-query-params';
import { useCurrentLayout } from './hooks/use-current-layout';

export interface ILayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
  const { getSearchParams, setSearchParams } = useQueryParams();

  const allParams = getSearchParams();

  const isSettingsDrawerOpen = allParams.settingsDrawer === true;

  const currentLayout = useCurrentLayout();

  const Provider = currentLayout.provider;

  return (
    <Provider>
      <SettingsDrawer
        open={isSettingsDrawerOpen}
        onClose={() => setSearchParams({ settingsDrawer: null })}
      />

      <DialogProvider>{children}</DialogProvider>
    </Provider>
  );
};
