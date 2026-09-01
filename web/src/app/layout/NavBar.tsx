import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Group } from "@mui/icons-material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(45deg, #003113 30%, #025e12 55%, #056b16 80%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Event Finder
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                Aktywności
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                O nas
              </Button>
              <Button
                color="inherit"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                Kontakt
              </Button>
            </Box>
            <Button size="large" variant="contained" color="warning">
              Utwórz aktywność
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
