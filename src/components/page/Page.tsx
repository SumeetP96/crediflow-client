import { Box, Typography } from '@mui/material';
import { ReactNode, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLayout } from '../../layouts/hooks/use-layout';
import { LayoutProvider } from '../../layouts/LayoutProvider';
import Breadcrumbs, { IBreadcrumb } from '../breadcrumbs/Breadcrumbs';

export interface IPageProps {
  title?: string;
  breadcrumbs?: IBreadcrumb[];
  header?: string;
  children: ReactNode;
}

function PageComponent({ children, title, breadcrumbs, header }: IPageProps) {
  const layout = useLayout();

  const location = useLocation();

  const updateAppBarHeader = useCallback(() => {
    const oldComponent = layout.state.appBarHeaderComponent as JSX.Element;

    const newComponent = header ? (
      <Typography key={location.pathname} color="text.primary">
        {header}
      </Typography>
    ) : (
      <Breadcrumbs key={location.pathname} breadcrumbs={breadcrumbs ?? []} />
    );

    const isDifferent = oldComponent?.key !== newComponent?.key;

    if (isDifferent) {
      layout.actions.setAppBarHeaderComponent(newComponent);
    }
  }, [breadcrumbs, header, layout.actions, layout.state.appBarHeaderComponent, location.pathname]);

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

export default function Page({ children, ...props }: IPageProps) {
  return (
    <LayoutProvider>
      <PageComponent {...props}>{children}</PageComponent>
    </LayoutProvider>
  );
}
