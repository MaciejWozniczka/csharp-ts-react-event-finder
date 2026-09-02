import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";

type Props = {
  activities: Activity[];
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  selectedActivity: Activity;
};

export default function ActivityDasboard({
  activities,
  onSelectActivity,
  onCancelSelectActivity,
  selectedActivity,
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
        {selectedActivity && (
          <ActivityDetail
            activity={selectedActivity}
            onCancelActivity={onCancelSelectActivity}
          />
        )}
      </Grid>
    </Grid>
  );
}
