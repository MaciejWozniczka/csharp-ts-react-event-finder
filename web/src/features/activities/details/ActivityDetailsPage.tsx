import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityLoadState from "../../../app/shared/components/ActivityLoadState";

export default function ActivityDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { activity, isLoadingActivity, activityError, refetchActivity } =
    useActivities(id);
  const from = location.state?.from;
  const backTo =
    typeof from === "string" && /^\/activities(?:\?|$)/.test(from)
      ? from
      : "/activities";
  if (isLoadingActivity || !activity)
    return (
      <ActivityLoadState
        loading={isLoadingActivity}
        error={activityError}
        onRetry={() => void refetchActivity()}
      />
    );
  return (
    <>
      <Button
        component={Link}
        to={backTo}
        startIcon={<ArrowBack />}
        sx={{ mb: 2, px: 0 }}
      >
        Wróć do wydarzeń
      </Button>
      <ActivityDetailsHeader activity={activity} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr) 340px",
          },
          gap: { xs: 3, md: 5 },
          mt: 4,
          alignItems: "start",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat key={activity.id} activityId={activity.id} />
        </Box>
        <ActivityDetailsSidebar />
      </Box>
    </>
  );
}
