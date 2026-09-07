import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router";
import NavBar from "./NavBar";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollRestoration
        getKey={(location) => location.pathname + location.search}
      />
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>
      <Box
        sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
      >
        <NavBar />
        <Container
          component="main"
          id="main-content"
          tabIndex={-1}
          maxWidth="lg"
          sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 5, md: 8 }, flex: 1 }}
        >
          <Outlet />
        </Container>
        <Box
          component="footer"
          sx={{ borderTop: 1, borderColor: "divider", py: 3 }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Event Finder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dobry czas zaczyna się od spotkania.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
