import { ReactNode, useState } from 'react';
import SettingsDrawer from '../components/settings-drawer/SettingsDrawer';
import { useCurrentLayout } from './hooks/use-current-layout';

export interface ILayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

  const currentLayout = useCurrentLayout();

  const Provider = currentLayout.provider;

  // For debugging purposes
  // console.log('🚀 ~ LayoutProvider ~ Provider:', Provider.name);

  return (
    <Provider openSettingsDrawer={() => setIsSettingsDrawerOpen(true)}>
      <SettingsDrawer open={isSettingsDrawerOpen} onClose={() => setIsSettingsDrawerOpen(false)} />

      {children}
    </Provider>
  );
};
