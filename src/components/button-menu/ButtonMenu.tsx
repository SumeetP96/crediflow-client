import { Box, Button, ButtonProps, IconButton, Menu, Tooltip } from '@mui/material';
import { ReactNode, useState } from 'react';

export interface IChildrenProps {
  closeMenu: () => void;
}

export interface IButtonMenu {
  tooltip?: string;
  label?: string;
  isIconButton?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  size?: 'small' | 'medium' | 'large';
  variant?: ButtonProps['variant'];
  children: ReactNode | ((params: IChildrenProps) => ReactNode);
}

export default function ButtonMenu({
  tooltip = 'Open Menu',
  label = 'Menu',
  isIconButton = true,
  iconPosition = 'start',
  icon,
  variant = 'outlined',
  children,
  size,
}: IButtonMenu) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const childrenProps: IChildrenProps = {
    closeMenu,
  };

  return (
    <Box>
      <Tooltip title={tooltip}>
        {isIconButton ? (
          <IconButton
            size={size}
            color="primary"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            {icon}
          </IconButton>
        ) : (
          <Button
            color="primary"
            size={size}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            variant={variant}
            disableElevation
            {...{
              [iconPosition === 'start' ? 'startIcon' : 'endIcon']: icon,
            }}
          >
            {label}
          </Button>
        )}
      </Tooltip>

      <Menu
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            style: {
              maxHeight: 600,
              minWidth: '18ch',
            },
          },
        }}
      >
        {typeof children === 'function' ? children(childrenProps) : children}
      </Menu>
    </Box>
  );
}
