import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../forms/ActivityForm";

type Props = {
  activities: Activity[];
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  selectedActivity: Activity;
  editMode: boolean;
  onOpenForm: (id: string) => void;
  onCloseForm: () => void;
};

export default function ActivityDasboard({
  activities,
  onSelectActivity,
  onCancelSelectActivity,
  selectedActivity,
  editMode,
  onOpenForm,
  onCloseForm,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          alignSelf: "flex-start",
          order: { xs: 1, md: 2 },
          position: { md: "sticky" },
          top: 24,
        }}
      >
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
            onOpenForm={onOpenForm}
          />
        )}
        {editMode && (
          <ActivityForm activity={selectedActivity} onCloseForm={onCloseForm} />
        )}
      </Grid>
    </Grid>
  );
}
