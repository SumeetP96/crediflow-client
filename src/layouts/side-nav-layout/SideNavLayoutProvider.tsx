import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import SideNavAppBarLayout from './SideNavLayout';

export interface ISideNavLayoutContextState {
  appBarHeaderComponent: ReactNode;
}

export interface ISideNavLayoutContextActions {
  setAppBarHeaderComponent: Dispatch<SetStateAction<ReactNode>>;
}

export interface ISideNavLayoutContext {
  state: ISideNavLayoutContextState;
  actions: ISideNavLayoutContextActions;
}

export const SideNavLayoutContext = createContext<ISideNavLayoutContext | null>(null);

export const SideNavLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [appBarHeaderComponent, setAppBarHeaderComponent] = useState<ReactNode>();

  const state = {
    appBarHeaderComponent,
  };

  const actions = {
    setAppBarHeaderComponent,
  };

  return (
    <SideNavLayoutContext.Provider value={{ state, actions }}>
      <SideNavAppBarLayout appBarHeaderComponent={appBarHeaderComponent}>
        {children}
      </SideNavAppBarLayout>
    </SideNavLayoutContext.Provider>
  );
};
