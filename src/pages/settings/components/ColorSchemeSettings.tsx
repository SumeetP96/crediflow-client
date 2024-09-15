import {
  DarkModeTwoTone,
  LightModeTwoTone,
  SettingsBrightnessTwoTone,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useDarkMode } from '../../../helpers/hooks/use-dark-mode';

export type Mode = 'light' | 'dark' | 'system';

export interface IColorScheme {
  mode: Mode;
  icon: React.ReactNode;
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

function ColorSchemeSettings() {
  const { mode, setMode } = useDarkMode();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {colorSchemes.map((scheme) => (
        <Button
          size="large"
          variant={scheme.mode === mode ? 'contained' : 'outlined'}
          startIcon={scheme.icon}
          onClick={() => setMode(scheme.mode)}
          disableElevation
        >
          {scheme.label}
        </Button>
      ))}
    </Box>
  );
}

export default ColorSchemeSettings;
