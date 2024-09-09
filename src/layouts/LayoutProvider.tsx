import { useCurrentLayout } from './hooks/use-current-layout';

export interface ILayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
  const currentLayout = useCurrentLayout();

  const Provider = currentLayout.provider;

  // For debugging purposes
  // console.log('🚀 ~ LayoutProvider ~ Provider:', Provider.name);

  return <Provider>{children}</Provider>;
};
