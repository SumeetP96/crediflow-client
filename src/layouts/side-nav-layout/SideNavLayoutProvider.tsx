import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import SideNavAppBarLayout from './SideNavLayout';

export interface ISideNavLayoutContextState {
  appBarHeaderComponent: ReactNode;
}

export interface ISideNavLayoutContextActions {
  setAppBarHeaderComponent: Dispatch<SetStateAction<ReactNode>>;
  openSettingsDrawer: () => void;
}

export interface ISideNavLayoutContext {
  state: ISideNavLayoutContextState;
  actions: ISideNavLayoutContextActions;
}

export const SideNavLayoutContext = createContext<ISideNavLayoutContext | null>(null);

export interface ISideNavLayoutProviderProps {
  children: ReactNode;
  openSettingsDrawer: () => void;
}

export const SideNavLayoutProvider = ({
  children,
  openSettingsDrawer,
}: ISideNavLayoutProviderProps) => {
  const [appBarHeaderComponent, setAppBarHeaderComponent] = useState<ReactNode>();

  const state = {
    appBarHeaderComponent,
  };

  const actions = {
    setAppBarHeaderComponent,
    openSettingsDrawer,
  };

  return (
    <SideNavLayoutContext.Provider value={{ state, actions }}>
      <SideNavAppBarLayout
        appBarHeaderComponent={appBarHeaderComponent}
        openSettingsDrawer={openSettingsDrawer}
      >
        {children}
      </SideNavAppBarLayout>
    </SideNavLayoutContext.Provider>
  );
};
