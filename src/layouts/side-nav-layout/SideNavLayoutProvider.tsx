import React, { createContext, useState } from 'react';
import SideNavAppBarLayout from './SideNavLayout';

export interface ISideNavLayoutContextState {
  appBarHeader: string;
}

export interface ISideNavLayoutContextActions {
  setAppBarHeader: (header: string) => void;
}

export interface ISideNavLayoutContext {
  state: ISideNavLayoutContextState;
  actions: ISideNavLayoutContextActions;
}

export const SideNavLayoutContext = createContext<ISideNavLayoutContext | null>(null);

export const SideNavLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [appBarHeader, setAppBarHeader] = useState('');

  const state = {
    appBarHeader,
  };

  const actions = {
    setAppBarHeader,
  };

  return (
    <SideNavLayoutContext.Provider value={{ state, actions }}>
      <SideNavAppBarLayout appBarHeader={appBarHeader}>{children}</SideNavAppBarLayout>
    </SideNavLayoutContext.Provider>
  );
};
