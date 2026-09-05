import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import theme from "./theme";
import { Outlet } from "react-router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#eeeeee",
        }}
      >
        <NavBar />
        <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 4 } }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
