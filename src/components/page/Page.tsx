import { Box } from '@mui/material';
import { ReactNode, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLayout } from '../../layouts/hooks/use-layout';
import Breadcrumbs, { IBreadcrumb } from '../breadcrumbs/Breadcrumbs';

export interface IPageProps {
  title?: string;
  breadcrumbs?: IBreadcrumb[];
  children: ReactNode;
}

function Page({ children, title, breadcrumbs }: IPageProps) {
  const layout = useLayout();

  const location = useLocation();

  const updateAppBarHeader = useCallback(() => {
    const oldComponent = layout.state.appBarHeaderComponent as JSX.Element;

    const newComponent = <Breadcrumbs key={location.pathname} breadcrumbs={breadcrumbs ?? []} />;

    const isDifferent = oldComponent?.key !== newComponent?.key;

    if (breadcrumbs && isDifferent) {
      layout.actions.setAppBarHeaderComponent(newComponent);
    } else if (!breadcrumbs) {
      layout.actions.setAppBarHeaderComponent(null);
    }
  }, [breadcrumbs, layout.actions, layout.state.appBarHeaderComponent, location.pathname]);

  useEffect(() => {
    updateAppBarHeader();
    if (title) {
      document.title = title;
    }
  }, [title, updateAppBarHeader]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, lg: 2 },
      }}
    >
      {children}
    </Box>
  );
}

export default Page;
