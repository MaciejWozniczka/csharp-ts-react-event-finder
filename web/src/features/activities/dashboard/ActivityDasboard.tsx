import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

type Props = {
  activities: Activity[];
};

export default function ActivityDasboard({ activities }: Props) {
  return (
    <Grid container>
      <Grid size={12}>
        <ActivityList activities={activities} />
      </Grid>
    </Grid>
  );
}
