import { Box, Button, Typography } from "@mui/material";
import { TravelExplore } from "@mui/icons-material";
import { Link } from "react-router";

export default function ActivityListEmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 7,
        px: 3,
        bgcolor: "background.paper",
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
      }}
    >
      <TravelExplore sx={{ fontSize: 46, color: "primary.main", mb: 2 }} />
      <Typography variant="h4" component="h2">
        {hasFilters ? "Jeszcze nie ten plan?" : "Tu zaczynają się nowe plany."}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        {hasFilters
          ? "Zmień kryteria lub wyczyść filtry, żeby zobaczyć więcej wydarzeń."
          : "Nie ma jeszcze wydarzeń. Dodaj pierwsze i zaproś do wspólnego czasu."}
      </Typography>
      {hasFilters ? (
        <Button variant="outlined" onClick={onClear}>
          Wyczyść filtry
        </Button>
      ) : (
        <Button variant="contained" component={Link} to="/activities/create">
          Dodaj wydarzenie
        </Button>
      )}
    </Box>
  );
}
