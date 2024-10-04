import { useContext } from 'react';
import { DynamicthemeContext } from './DynamicThemeProvider';

export default function useDynamicTheme() {
  const context = useContext(DynamicthemeContext);

  if (!context) {
    throw new Error('useDynamicTheme must be used within a DynamicThemeProvider');
  }

  return context;
}
