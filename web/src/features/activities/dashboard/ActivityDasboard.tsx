import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Alert,
  Skeleton,
} from "@mui/material";
import { Search, TravelExplore } from "@mui/icons-material";
import { Link, useSearchParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import { filterActivities } from "./filterActivities";

export default function ActivityDashboard() {
  const { activities, isPending, isActivitiesError, refetchActivities } =
    useActivities();
  const [params, setParams] = useSearchParams();
  const changeFilter = (key: string, value: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  };
  const results = filterActivities(activities ?? [], params);
  const changeDateRange = (from: string, to: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete("date");
        for (const [key, value] of [
          ["from", from],
          ["to", to],
        ]) {
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      },
      { replace: true },
    );
  };
  const cities = [
    ...new Set((activities ?? []).map((a) => a.city).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, "pl"));
  const hasFilters = [
    "q",
    "category",
    "city",
    "date",
    "from",
    "to",
    "status",
  ].some((key) => !!params.get(key));
  const clearFilters = () =>
    setParams(params.get("sort") ? { sort: params.get("sort")! } : {}, {
      replace: true,
    });

  return (
    <>
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
        onChange={(e) => changeFilter("q", e.target.value)}
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "320px minmax(0, 1fr)",
          },
          gap: { xs: 3, md: 4 },
          alignItems: "start",
        }}
      >
        <ActivityFilters
          params={params}
          cities={cities}
          categories={[
            ...new Set(
              (activities ?? []).map((a) => a.category).filter(Boolean),
            ),
          ]}
          onChange={changeFilter}
          onDateRangeChange={changeDateRange}
          onClear={clearFilters}
          hasFilters={hasFilters}
        />
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 2.5,
            }}
          >
            <Typography role="status" variant="body2" color="text.secondary">
              {isPending
                ? "Szukamy wydarzeń…"
                : isActivitiesError && !activities
                  ? "Wydarzenia niedostępne"
                  : `Wyniki: ${results.length}`}
            </Typography>
            <TextField
              select
              size="small"
              label="Sortowanie"
              value={params.get("sort") === "desc" ? "desc" : "asc"}
              onChange={(e) => changeFilter("sort", e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="asc">Data: rosnąco</MenuItem>
              <MenuItem value="desc">Data: malejąco</MenuItem>
            </TextField>
          </Box>
          {isActivitiesError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              action={
                <Button
                  color="inherit"
                  onClick={() => void refetchActivities()}
                >
                  Ponów
                </Button>
              }
            >
              Nie udało się pobrać wydarzeń.
              {activities
                ? " Pokazujemy ostatnio pobrane dane."
                : " Spróbuj ponownie."}
            </Alert>
          )}
          {isPending ? (
            <Box aria-label="Ładowanie wydarzeń" aria-busy="true">
              {[1, 2, 3].map((key) => (
                <Skeleton
                  key={key}
                  variant="rounded"
                  height={230}
                  sx={{ mb: 2 }}
                />
              ))}
            </Box>
          ) : results.length ? (
            <ActivityList activities={results} />
          ) : (
            !isActivitiesError && (
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
                <TravelExplore
                  sx={{ fontSize: 46, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h4" component="h2">
                  {hasFilters
                    ? "Jeszcze nie ten plan?"
                    : "Tu zaczynają się nowe plany."}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  {hasFilters
                    ? "Zmień kryteria lub wyczyść filtry, żeby zobaczyć więcej wydarzeń."
                    : "Nie ma jeszcze wydarzeń. Dodaj pierwsze i zaproś do wspólnego czasu."}
                </Typography>
                {hasFilters ? (
                  <Button variant="outlined" onClick={clearFilters}>
                    Wyczyść filtry
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    component={Link}
                    to="/activities/create"
                  >
                    Dodaj wydarzenie
                  </Button>
                )}
              </Box>
            )
          )}
        </Box>
      </Box>
    </>
  );
}
