import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FEE233', // Noon Yellow
      contrastText: '#000000',
    },
    secondary: {
      main: '#404553', // Dark Grey
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F7FA', // Light grey background like Noon
      paper: '#FFFFFF',
    },
    text: {
      primary: '#404553',
      secondary: '#7E859B',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // Remove uppercase transform
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
           '&:hover': {
              backgroundColor: '#FDD835', // Slightly darker yellow
           }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)',
                border: 'none',
            }
        }
    }
  },
});

export default theme;
