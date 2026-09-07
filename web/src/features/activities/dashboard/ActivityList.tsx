import { Alert, Box, Button, Skeleton } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useActivityFilters } from "../../../lib/hooks/useActivityFilters";
import { filterActivities } from "./filterActivities";
import ActivityCard from "./ActivityCard";
import ActivityListToolbar from "./ActivityListToolbar";
import ActivityListEmptyState from "./ActivityListEmptyState";

export default function ActivityList() {
  const { activities, isPending, isActivitiesError, refetchActivities } =
    useActivities();
  const { params, hasFilters, clearFilters } = useActivityFilters();
  const results = filterActivities(activities ?? [], params);

  return (
    <Box sx={{ minWidth: 0 }}>
      <ActivityListToolbar
        count={results.length}
        isPending={isPending}
        isError={isActivitiesError}
        hasData={!!activities}
      />
      {isActivitiesError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" onClick={() => void refetchActivities()}>
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
            <Skeleton key={key} variant="rounded" height={230} sx={{ mb: 2 }} />
          ))}
        </Box>
      ) : results.length ? (
        <Box
          component="ul"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            p: 0,
            m: 0,
            listStyle: "none",
          }}
        >
          {results.map((activity) => (
            <Box component="li" key={activity.id}>
              <ActivityCard activity={activity} />
            </Box>
          ))}
        </Box>
      ) : (
        !isActivitiesError && (
          <ActivityListEmptyState
            hasFilters={hasFilters}
            onClear={clearFilters}
          />
        )
      )}
    </Box>
  );
}
