import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useActivityFilters } from "../../../lib/hooks/useActivityFilters";

export default function ActivityDashboardHeader() {
  const { params, changeFilter } = useActivityFilters();
  return (
    <Box>
      <Typography variant="overline" color="secondary.main">
        Twój czas, Twoje plany
      </Typography>
      <Typography
        component="h1"
        variant="h2"
        sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        Coś dobrego jest blisko.
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Znajdź wydarzenie, na które naprawdę masz ochotę.
      </Typography>
      <TextField
        fullWidth
        label="Szukaj wydarzeń"
        placeholder="Nazwa, miejsce lub coś, co lubisz…"
        value={params.get("q") ?? ""}
        onChange={(event) => changeFilter("q", event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />
    </Box>
  );
}
