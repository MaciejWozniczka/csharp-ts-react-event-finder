import { Box, Chip, Typography } from "@mui/material";
import { AccessTime, PlaceOutlined } from "@mui/icons-material";
import { formatDate } from "../../../app/utils/formatDate";
import ActivityImage from "../../../app/shared/components/ActivityImage";
import ActivityDetailsActions from "./ActivityDetailsActions";

function getCategoryValue(category: Activity['category']): string {
  return typeof category === 'string' ? category : category.value;
}

export default function ActivityDetailsHeader({
  activity,
}: {
  activity: Activity;
}) {
  const categoryValue = getCategoryValue(activity.category);
  return (
    <Box component="header">
      <Box
        sx={{
          height: { xs: 230, sm: 330, md: 380 },
          borderRadius: 4,
          overflow: "hidden",
          mb: 3,
        }}
      >
        <ActivityImage category={categoryValue} eager />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
        <Chip
          label={categoryValue}
          sx={{ bgcolor: "primary.light", color: "primary.main" }}
        />
        {activity.isCancelled && (
          <Chip label="Wydarzenie odwołane" color="error" />
        )}
      </Box>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: { xs: "2rem", md: "2.75rem" },
          overflowWrap: "anywhere",
        }}
      >
        {activity.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 3 },
          mt: 2,
          color: "text.secondary",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AccessTime fontSize="small" />
          <Typography>{formatDate(activity.date)}</Typography>
        </Box>
        <Box
          sx={{ display: "flex", gap: 1, alignItems: "center", minWidth: 0 }}
        >
          <PlaceOutlined fontSize="small" />
          <Typography sx={{ overflowWrap: "anywhere" }}>
            {activity.city}
          </Typography>
        </Box>
      </Box>
      <ActivityDetailsActions activity={activity} />
    </Box>
  );
}
