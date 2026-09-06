import { ArrowForward, Group } from "@mui/icons-material";
import { alpha, Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      className="home"
      component="main"
      elevation={0}
      sx={{
        color: "text.primary",
        bgcolor: "background.paper",
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
        minHeight: { xs: 360, md: 480 },
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 5, md: 8 },
        mb: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          color: "primary.main",
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        <Group sx={{ fontSize: { xs: 48, sm: 64 } }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          Event Finder
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: "48ch", lineHeight: 1.75 }}
      >
        Odkrywaj aktywności, poznawaj ludzi i planuj wspólny czas.
      </Typography>
      <Button
        component={Link}
        to="/activities"
        size="large"
        variant="contained"
        endIcon={<ArrowForward />}
        sx={{ minHeight: 48, px: 3, width: { xs: "100%", sm: "auto" } }}
      >
        Przeglądaj aktywności
      </Button>
    </Paper>
  );
}
