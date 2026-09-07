import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Divider,
  MenuItem,
} from "@mui/material";
import { ArrowBack, Check } from "@mui/icons-material";
import { type SubmitEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";
import { categories } from "../../../app/utils/categories";
import ActivityLoadState from "../../../app/shared/components/ActivityLoadState";

function toDateTimeLocalValue(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (part: number) => part.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function ActivityForm() {
  const { id } = useParams();
  const {
    updateActivity,
    createActivity,
    activity,
    isLoadingActivity,
    activityError,
    refetchActivity,
  } = useActivities(id);
  const navigate = useNavigate();
  const saving = updateActivity.isPending || createActivity.isPending;
  const backTo = id ? `/activities/${id}` : "/activities";

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || (id && !activity)) return;
    const formData = new FormData(event.currentTarget);
    const text = (key: string) => String(formData.get(key) ?? "").trim();
    const data: Activity = {
      id: activity?.id ?? "",
      title: text("title"),
      description: text("description"),
      category: text("category"),
      date: new Date(text("date")).toISOString(),
      city: text("city"),
      venue: text("venue"),
      isCancelled: activity?.isCancelled ?? false,
      latitude: activity?.latitude ?? 0,
      longitude: activity?.longitude ?? 0,
    };
    if (activity)
      updateActivity.mutate(data, { onSuccess: () => navigate(backTo) });
    else
      createActivity.mutate(data, {
        onSuccess: (createdId) => navigate(`/activities/${createdId}`),
      });
  };

  if (id && (isLoadingActivity || !activity))
    return (
      <ActivityLoadState
        loading={isLoadingActivity}
        error={activityError}
        onRetry={() => void refetchActivity()}
      />
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Button
        component={Link}
        to={backTo}
        startIcon={<ArrowBack />}
        disabled={saving}
        sx={{ px: 0, mb: 2 }}
      >
        Wróć {id ? "do wydarzenia" : "do wydarzeń"}
      </Button>
      <Typography component="p" variant="overline" color="secondary.main">
        Dobry pomysł zasługuje na spotkanie
      </Typography>
      <Typography component="h1" variant="h2" sx={{ mt: 1 }}>
        {id ? "Edytuj wydarzenie" : "Zaproś do wspólnego czasu."}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Opowiedz, co planujesz. Podaj termin i miejsce, żeby inni mogli
        zaplanować swój czas.
      </Typography>
      <Paper
        sx={{
          border: 1,
          borderColor: "divider",
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
        }}
      >
        <Box
          component="form"
          key={activity?.id ?? "create"}
          onSubmit={handleSubmit}
        >
          <Box
            component="fieldset"
            disabled={saving}
            sx={{
              m: 0,
              p: 0,
              border: 0,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography component="h2" variant="h5">
              Co się wydarzy?
            </Typography>
            <TextField
              name="title"
              label="Nazwa wydarzenia"
              required
              defaultValue={activity?.title ?? ""}
              placeholder="Np. Sobotni spacer nad Wartą"
              slotProps={{ htmlInput: { maxLength: 200, pattern: ".*\\S.*" } }}
            />
            <TextField
              name="description"
              label="Opis wydarzenia"
              required
              multiline
              minRows={4}
              defaultValue={activity?.description ?? ""}
              helperText="Napisz, czego można się spodziewać i co warto zabrać."
            />
            <TextField
              select
              name="category"
              label="Kategoria"
              required
              defaultValue={activity?.category ?? ""}
            >
              {[
                ...new Set([
                  ...categories,
                  ...(activity?.category ? [activity.category] : []),
                ]),
              ].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <Divider />
            <Typography component="h2" variant="h5">
              Kiedy i gdzie?
            </Typography>
            <TextField
              name="date"
              label="Data i godzina"
              type="datetime-local"
              required
              defaultValue={
                activity?.date ? toDateTimeLocalValue(activity.date) : ""
              }
              slotProps={{ inputLabel: { shrink: true } }}
              helperText="Godzina w Twojej lokalnej strefie czasowej."
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField
                name="city"
                label="Miasto"
                required
                defaultValue={activity?.city ?? ""}
                slotProps={{ htmlInput: { pattern: ".*\\S.*" } }}
              />
              <TextField
                name="venue"
                label="Miejsce lub adres"
                required
                defaultValue={activity?.venue ?? ""}
                slotProps={{ htmlInput: { pattern: ".*\\S.*" } }}
              />
            </Box>
          </Box>
          {(updateActivity.isError || createActivity.isError) && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Nie udało się zapisać wydarzenia. Twoje dane pozostały w
              formularzu. Spróbuj ponownie.
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 4,
            }}
          >
            <Button
              type="button"
              color="inherit"
              disabled={saving}
              onClick={() => navigate(backTo)}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              variant="contained"
              loading={saving}
              startIcon={<Check />}
            >
              {id ? "Zapisz zmiany" : "Utwórz wydarzenie"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
