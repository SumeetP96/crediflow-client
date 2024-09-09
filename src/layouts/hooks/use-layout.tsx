import { useContext } from 'react';
import { useCurrentLayout } from './use-current-layout';

export const useLayout = () => {
  const currentLayout = useCurrentLayout();

  const context = useContext(currentLayout.context);

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
};
