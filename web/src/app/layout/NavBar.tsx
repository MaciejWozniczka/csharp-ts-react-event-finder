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
          boxShadow: "0 10px 28px rgba(0, 49, 19, 0.22)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              minHeight: { xs: 72, md: 82 },
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  Event Finder
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <Button color="inherit" sx={{ fontSize: "1rem", px: 1.25 }}>
                Aktywności
              </Button>
              <Button color="inherit" sx={{ fontSize: "1rem", px: 1.25 }}>
                O nas
              </Button>
              <Button color="inherit" sx={{ fontSize: "1rem", px: 1.25 }}>
                Kontakt
              </Button>
            </Box>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => {}}
              sx={{ boxShadow: "none", px: { xs: 1.5, md: 2.25 } }}
            >
              Utwórz aktywność
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
