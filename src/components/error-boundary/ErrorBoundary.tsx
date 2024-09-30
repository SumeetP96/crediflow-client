import { BugReport, ErrorOutline, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fade,
  Grow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError() as Error;

  const isDevEnv = import.meta.env.VITE_APP_ENV === 'development';

  const [isExpanded, setIsExpanded] = useState(true);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const ErrorIcon = isDevEnv ? BugReport : ErrorOutline;

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.error.light,
        padding: { xs: 5, md: 2 },
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <Grow in timeout={600}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 600,
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 10px 30px -5px ${theme.palette.error.main}`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              backgroundColor: theme.palette.error.main,
              borderRadius: '50%',
              opacity: 0.05,
              animation: 'pulse 15s infinite ease-in-out',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <ErrorIcon
              color="error"
              sx={{
                fontSize: 50,
                marginRight: theme.spacing(2),
                animation: 'shake 0.5s infinite',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'rotate(-5deg)' },
                  '50%': { transform: 'rotate(5deg)' },
                },
              }}
            />
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              component="h1"
              color="error"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Oops! Something went wrong.
            </Typography>
          </Box>

          {isDevEnv ? (
            <Accordion
              expanded={isExpanded}
              onChange={() => setIsExpanded(!isExpanded)}
              sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } }}
              >
                <Typography variant="h6" color="text.secondary">
                  Error details (click to {isExpanded ? 'collapse' : 'expand'})
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Fade in={isExpanded} timeout={500}>
                  <Box>
                    <Typography variant="body1" paragraph color="error.main">
                      <strong>Error name:</strong> {error.name}
                    </Typography>
                    <Typography variant="body1" paragraph color="error.main">
                      <strong>Error message:</strong> {error.message}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        overflowX: 'auto',
                        backgroundColor: theme.palette.grey[100],
                        p: 2,
                        borderRadius: 2,
                        color: theme.palette.error.dark,
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}
                    >
                      <strong>Stack trace:</strong>
                      {error.stack}
                    </Typography>
                  </Box>
                </Fade>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
              We're sorry, but there was an error. Please try again later or contact support if the
              problem persists.
            </Typography>
          )}
        </Paper>
      </Grow>
    </Box>
  );
}
