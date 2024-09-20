import { Box, Button, ButtonProps, IconButton, Menu, Tooltip } from '@mui/material';
import { ReactNode, useState } from 'react';

export interface IButtonMenu {
  tooltip?: string;
  isIconButton?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  size?: 'small' | 'medium' | 'large';
  variant?: ButtonProps['variant'];
  children: ReactNode;
}

export default function ButtonMenu({
  tooltip = 'Open Menu',
  isIconButton = true,
  iconPosition = 'start',
  icon,
  variant = 'outlined',
  children,
  size,
}: IButtonMenu) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

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
            Columns
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
        {children}
      </Menu>
    </Box>
  );
}
