import { Box, Button, CssBaseline, Paper, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useParams, useRouteError } from 'react-router';
import { AppRoute } from '../../router/helpers';

const errorStatusCodesMap: Record<number, string> = {
  // Client error responses
  400: 'Bad Request. Please check your input.',
  401: 'Unauthorized. Please log in.',
  402: 'Payment Required',
  403: "Forbidden. You don't have permission.",
  404: 'Page Not Found. Check the URL.',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',

  // Server error responses
  500: 'Internal Server Error. Try again later.',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

interface IRouterError {
  status: number;
  statusText: string;
}

interface IError {
  status: number | string;
  message: string;
}

export default function Error() {
  const routeError = useRouteError() as IRouterError;

  const params = useParams();

  const error: IError = {
    status: '',
    message: 'An error occurred',
  };

  if (params.code) {
    error.status = Number(params.code);
    error.message = errorStatusCodesMap[error.status];
  }

  if (routeError) {
    error.status = routeError.status;
    error.message = routeError.statusText;
  }

  const goToHome = () => {
    window.location.href = `${import.meta.env.VITE_APP_URL}${AppRoute('DASHBOARD')}`;
  };

  const isDarkMode = localStorage.getItem('mui-mode') === 'dark';

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: isDarkMode ? '#101314' : blueGrey[50],
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 5,
            width: { xs: '90%', md: '550px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderRadius: '12px',
            bgcolor: isDarkMode ? '#11171c' : 'white',
            color: isDarkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h3">Error {error.status}</Typography>

          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            {error.message}
          </Typography>

          <Button variant="outlined" onClick={goToHome}>
            Go Back to Homepage
          </Button>
        </Paper>
      </Box>
    </>
  );
}
