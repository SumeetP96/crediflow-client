import { Link, Breadcrumbs as MuiBreadCrumbs } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface IBreadcrumb {
  label: string;
  to?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface IBreadcrumbsProps {
  breadcrumbs: IBreadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: IBreadcrumbsProps) {
  const navigate = useNavigate();

  return (
    <MuiBreadCrumbs>
      {breadcrumbs.map(({ label, to, active, disabled }) => (
        <Link
          key={label}
          underline={active || disabled ? 'none' : 'hover'}
          color={active || disabled ? 'textDisabled' : 'textPrimary'}
          fontWeight={400}
          onClick={() => {
            if (active || disabled || !to) return;
            navigate(to);
          }}
          sx={{
            cursor: active || disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
        </Link>
      ))}
    </MuiBreadCrumbs>
  );
}
