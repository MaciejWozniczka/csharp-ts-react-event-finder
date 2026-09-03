import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../forms/ActivityForm";

type Props = {
  activities: Activity[];
  onSelectActivity: (id: string) => void;
  onDeleteActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  selectedActivity: Activity;
  editMode: boolean;
  onOpenForm: (id: string) => void;
  onCloseForm: () => void;
  onSubmitForm: (activity: Activity) => void;
};

export default function ActivityDasboard({
  activities,
  onSelectActivity,
  onDeleteActivity,
  onCancelSelectActivity,
  selectedActivity,
  editMode,
  onOpenForm,
  onCloseForm,
  onSubmitForm,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{ alignSelf: "flex-start", position: { md: "sticky" }, top: 24 }}
      >
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
            onOpenForm={onOpenForm}
            onDeleteActivity={onDeleteActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            onCloseForm={onCloseForm}
            onSubmitForm={onSubmitForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
