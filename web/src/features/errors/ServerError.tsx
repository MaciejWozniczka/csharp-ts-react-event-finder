import { ArrowBack, ErrorOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

type ServerErrorState = {
  error?: { message?: unknown; details?: unknown };
};

export default function ServerError() {
  const { state } = useLocation();
  const error = (state as ServerErrorState | null)?.error;
  const message =
    typeof error?.message === "string" && error.message.trim()
      ? error.message
      : "Nie udało się przetworzyć żądania. Spróbuj ponownie za chwilę.";
  const details =
    typeof error?.details === "string" ? error.details.trim() : "";

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
      <ErrorOutlined sx={{ fontSize: 56, color: "error.main", mb: 2 }} />
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        Błąd 500
      </Typography>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mt: 1, fontSize: { xs: "1.75rem", sm: "2.5rem" } }}
      >
        Wystąpił błąd serwera
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ mt: 2, mb: 4, overflowWrap: "anywhere" }}
      >
        {message}
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
      {details && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box component="details" sx={{ textAlign: "left" }}>
            <Box
              component="summary"
              sx={{ cursor: "pointer", fontWeight: 700, py: 1.5 }}
            >
              Szczegóły błędu
            </Box>
            <Typography
              component="pre"
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 2,
                mb: 0,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {details}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}
