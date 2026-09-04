import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#075c2d", dark: "#003d1c", light: "#d7f1e2" },
    secondary: { main: "#d97706", dark: "#a64d08", light: "#ffedca" },
    background: { default: "#f4f7f3", paper: "#fcfdfb" },
    text: { primary: "#173226", secondary: "#617267" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.03em" },
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default theme;
