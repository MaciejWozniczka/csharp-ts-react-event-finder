import { Alert, Box, Typography } from "@mui/material";
import { CalendarTodayOutlined, PlaceOutlined } from "@mui/icons-material";
import { formatDate } from "../../../app/utils/formatDate";
import MapComponent from "../../../app/shared/components/MapComponent";

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
          gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" },
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
              {formatDate(activity.date)}
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
          </Box>
        </Box>
      </Box>
      <Box
        role="region"
        aria-label={`Lokalizacja wydarzenia: ${activity.venue}`}
        sx={{
          height: 220,
          mt: 3,
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <MapComponent
          position={[activity.latitude, activity.longitude]}
          venue={activity.venue}
        />
      </Box>
      {activity.isCancelled && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          To wydarzenie zostało odwołane.
        </Alert>
      )}
    </Box>
  );
}
