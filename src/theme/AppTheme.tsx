import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { colorSchemes, shape, typography } from "./themePrimitives";
import shadows from "@mui/material/styles/shadows";

interface AppThemeProps {
  children: React.ReactNode;
}

const AppTheme = (props: AppThemeProps) => {
  const { children } = props;
  const theme = React.useMemo(() => {
    return createTheme({
      // for simplified css light and dark mode.
      // colorSchemes: { light: true, dark: true },
      // cssVariables: {
      //   colorSchemeSelector: "class",
      // },
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes,
      typography,
      shadows,
      shape,
    });
  }, []);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
export default AppTheme;
