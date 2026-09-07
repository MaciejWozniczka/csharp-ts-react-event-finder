import { Box } from "@mui/material";
import ActivityDashboardHeader from "./ActivityDashboardHeader";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
  return (
    <>
      <ActivityDashboardHeader />
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
        <ActivityFilters />
        <ActivityList />
      </Box>
    </>
  );
}
