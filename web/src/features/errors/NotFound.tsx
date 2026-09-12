import { ArrowBack, SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper
      variant="outlined"
      sx={{
        maxWidth: 720,
        mx: "auto",
        my: { xs: 2, md: 5 },
        px: { xs: 3, sm: 5 },
        py: { xs: 5, sm: 7 },
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <SearchOff sx={{ fontSize: 56, color: "primary.main", mb: 2 }} />
      <Typography variant="overline" color="text.secondary" sx={{ display: "block" }}>
        Błąd 404
      </Typography>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mt: 1, fontSize: { xs: "1.75rem", sm: "2.5rem" } }}
      >
        Nie znaleźliśmy tej strony
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 2, mb: 4 }}>
        Wróć do listy aktywności i znajdź coś dla siebie.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/activities"
        startIcon={<ArrowBack />}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        Wróć do listy aktywności
      </Button>
    </Paper>
  );
}
