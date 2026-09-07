import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#285d49",
      dark: "#183e30",
      light: "#e6eee7",
      contrastText: "#fcfdf9",
    },
    secondary: { main: "#a75035", dark: "#813922", light: "#f5e9df" },
    background: { default: "#f7f7f2", paper: "#fdfdf9" },
    text: { primary: "#243b30", secondary: "#617066" },
    divider: "#dde3d9",
    error: { main: "#b23f36" },
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: "-0.045em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: "-0.035em",
    },
    h3: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.025em" },
    h4: { fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontSize: "1.15rem", fontWeight: 700 },
    h6: { fontSize: "1rem", fontWeight: 700 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 700, textTransform: "none" },
    overline: { fontWeight: 700, letterSpacing: "0.14em" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 44, borderRadius: 12, paddingInline: 20 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12, backgroundColor: "#fdfdf9" },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "oklch(0.975 0.008 105)" },
        "::selection": { background: "#d8e8cb" },
        "a, button, input, textarea, [tabindex]": { scrollMarginTop: 100 },
        ":focus-visible": { outline: "3px solid #a75035", outlineOffset: 4 },
      },
    },
  },
});
export default theme;
