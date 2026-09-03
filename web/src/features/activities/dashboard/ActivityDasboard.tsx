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
  onSubmitForm: (activity: Activity) => void;
};

export default function ActivityDasboard({
  activities,
  onSelectActivity,
  onCancelSelectActivity,
  selectedActivity,
  editMode,
  onOpenForm,
  onCloseForm,
  onSubmitForm,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
            onOpenForm={onOpenForm}
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
