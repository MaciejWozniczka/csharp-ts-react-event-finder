import { Alert, Box, Button, Skeleton, Typography } from "@mui/material";
import { ArrowBack, EventBusyOutlined } from "@mui/icons-material";
import { isAxiosError } from "axios";
import { Link } from "react-router";

export default function ActivityLoadState({
  loading,
  error,
  onRetry,
}: {
  loading: boolean;
  error: unknown;
  onRetry: () => void;
}) {
  if (loading)
    return (
      <Box aria-label="Ładowanie wydarzenia" aria-busy="true">
        <Skeleton variant="rounded" height={300} />
        <Skeleton height={70} />
        <Skeleton height={160} />
      </Box>
    );
  const missing =
    !error || (isAxiosError(error) && error.response?.status === 404);
  return (
    <Box sx={{ maxWidth: 620, mx: "auto", textAlign: "center", py: 6 }}>
      <EventBusyOutlined sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
      <Typography component="h1" variant="h3">
        {missing
          ? "Nie znaleźliśmy tego wydarzenia."
          : "Nie udało się wczytać wydarzenia."}
      </Typography>
      <Typography color="text.secondary" sx={{ my: 2 }}>
        {missing
          ? "Mogło zostać usunięte lub adres jest niepoprawny."
          : "Sprawdź połączenie i spróbuj ponownie."}
      </Typography>
      {!missing && (
        <Alert severity="error" sx={{ my: 2 }}>
          Dane wydarzenia są chwilowo niedostępne.
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button component={Link} to="/activities" startIcon={<ArrowBack />}>
          Wróć do wydarzeń
        </Button>
        {!missing && (
          <Button variant="contained" onClick={onRetry}>
            Spróbuj ponownie
          </Button>
        )}
      </Box>
    </Box>
  );
}
