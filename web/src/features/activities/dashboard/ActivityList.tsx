import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  return (
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
      {activities.map((activity) => (
        <Box component="li" key={activity.id}>
          <ActivityCard activity={activity} />
        </Box>
      ))}
    </Box>
  );
}
