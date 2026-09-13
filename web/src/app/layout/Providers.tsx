import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { plPL } from "@mui/x-date-pickers/locales";
import { pl } from "date-fns/locale";
import type { PropsWithChildren } from "react";
import theme from "./theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={pl}
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
