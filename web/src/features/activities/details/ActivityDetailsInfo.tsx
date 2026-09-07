import { Alert, Box, Typography } from "@mui/material";
import { CalendarTodayOutlined, PlaceOutlined } from "@mui/icons-material";
import { formatActivityDate } from "../../../app/utils/formatDate";

export default function ActivityDetailsInfo({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <Box component="section" aria-labelledby="about-event" sx={{ mb: 4 }}>
      <Typography variant="h3" component="h2" id="about-event" sx={{ mb: 2 }}>
        O wydarzeniu
      </Typography>
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          maxWidth: "70ch",
          color: "text.secondary",
        }}
      >
        {activity.description ||
          "Organizator nie dodał jeszcze opisu wydarzenia."}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          mt: 3,
          pt: 3,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <CalendarTodayOutlined color="primary" fontSize="small" />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Kiedy
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {formatActivityDate(activity.date)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <PlaceOutlined color="primary" fontSize="small" />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary">
              Gdzie
            </Typography>
            <Typography sx={{ fontWeight: 500, overflowWrap: "anywhere" }}>
              {activity.venue}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.city}
            </Typography>
          </Box>
        </Box>
      </Box>
      {activity.isCancelled && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          To wydarzenie zostało odwołane.
        </Alert>
      )}
    </Box>
  );
}
