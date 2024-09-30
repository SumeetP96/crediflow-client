import { Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import ThemeProviderWrapper from '../../components/theme-provider-wrapper/ThemeProviderWrapper';

function NotFoundComponent() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        p: 3,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* 404 Text */}
        <Typography
          variant={isMobile ? 'h2' : 'h1'}
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            width: isMobile ? '60px' : '100px',
            height: '4px',
            backgroundColor: theme.palette.secondary.main,
            margin: theme.spacing(2, 'auto'),
          }}
        />

        {/* Message */}
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{
            mb: 4,
            color: theme.palette.text.primary,
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>

        {/* Home Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            padding: '10px 30px',
            fontSize: '1rem',
            textTransform: 'none',
          }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go to Homepage
        </Button>

        {/* Additional Information */}
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            color: theme.palette.text.secondary,
          }}
        >
          If you believe this is an error, please contact our support team.
        </Typography>
      </Box>
    </Box>
  );
}

export default function NotFound() {
  return (
    <ThemeProviderWrapper>
      <NotFoundComponent />
    </ThemeProviderWrapper>
  );
}
