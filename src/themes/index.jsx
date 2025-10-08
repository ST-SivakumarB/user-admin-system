import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

// project imports
import Palette from './palette';
import Typography from './typography';

// import componentStyleOverrides from '../themes/compStyleOverride'; skkk
import customShadows from './shadows';

export default function ThemeCustomization({ children }) {

  const borderRadius = 8;           // default border radius
  const fontFamily = "'Roboto', sans-serif"; // default font
  const mode = 'light';             // default theme mode
  const outlinedFilled = false;     // default outlinedFilled
  const presetColor = 'default';    // default color preset

  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography = useMemo(() => Typography(theme, borderRadius, fontFamily), [theme, borderRadius, fontFamily]);
  const themeCustomShadows = useMemo(() => customShadows(mode, theme), [mode, theme]);

  const themeOptions = useMemo(
    () => ({
      direction: 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows
    }),
    [theme, themeCustomShadows, themeTypography]
  );

  const themes = createTheme(themeOptions);
  // themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius, outlinedFilled), [themes, borderRadius, outlinedFilled]); skkk

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = { children: PropTypes.node };
