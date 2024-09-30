import { DarkModeTwoTone, LightModeTwoTone, SettingsBrightnessTwoTone } from '@mui/icons-material';
import { Box, Button, ButtonGroup, ButtonProps, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { useDarkMode } from '../../helpers/hooks/use-dark-mode';

export type Mode = 'light' | 'dark' | 'system';

export interface IColorScheme {
  mode: Mode;
  icon: ReactNode;
  label: string;
}

const colorSchemes: IColorScheme[] = [
  {
    mode: 'light',
    icon: <LightModeTwoTone />,
    label: 'Light',
  },
  {
    mode: 'dark',
    icon: <DarkModeTwoTone />,
    label: 'Dark',
  },
  {
    mode: 'system',
    icon: <SettingsBrightnessTwoTone />,
    label: 'System',
  },
];

export interface IColorSchemeSettingButtonsProps {
  size?: ButtonProps['size'];
  sx?: SxProps;
}

export default function ColorSchemeSettingButtons({
  size = 'medium',
  sx,
}: IColorSchemeSettingButtonsProps) {
  const { mode, setMode } = useDarkMode();

  return (
    <Box sx={{ display: 'flex', gap: 1, ...sx }}>
      <ButtonGroup size={size}>
        {colorSchemes.map((scheme) => (
          <Button
            variant={scheme.mode === mode ? 'contained' : 'outlined'}
            startIcon={scheme.icon}
            onClick={() => setMode(scheme.mode)}
            disableElevation
          >
            {scheme.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
