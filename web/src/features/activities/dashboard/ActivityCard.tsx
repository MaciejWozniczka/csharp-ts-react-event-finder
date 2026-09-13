import { Box, Button, Chip, Typography } from "@mui/material";
import { AccessTime, ArrowForward, PlaceOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router";
import { formatActivityDate } from "../../../app/utils/formatDate";
import ActivityImage from "../../../app/shared/components/ActivityImage";

function getCategoryValue(category: Activity['category']): string {
  return typeof category === 'string' ? category : category.value;
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const location = useLocation();
  const categoryValue = getCategoryValue(activity.category);
  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          sm: "190px minmax(0, 1fr)",
        },
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
        overflow: "hidden",
        transition: "border-color 180ms ease-out",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 190, sm: 240 },
          height: { xs: 190, sm: "100%" },
        }}
      >
        <ActivityImage category={categoryValue} />
        {activity.isCancelled && (
          <Chip
            size="small"
            label="Odwołane"
            color="error"
            sx={{ position: "absolute", top: 12, left: 12 }}
          />
        )}
      </Box>
      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography
          variant="overline"
          color="secondary.main"
          sx={{ lineHeight: 1.5, mb: 1 }}
        >
          {categoryValue}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{ overflowWrap: "anywhere", mb: 1.5 }}
        >
          {activity.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            color: "text.secondary",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <AccessTime sx={{ fontSize: 17 }} />
            <Typography variant="body2">
              {formatActivityDate(activity.date)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              minWidth: 0,
            }}
          >
            <PlaceOutlined sx={{ fontSize: 17 }} />
            <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
              {activity.city}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            overflowWrap: "anywhere",
            mb: 1.5,
          }}
        >
          {activity.description}
        </Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          state={{ from: location.pathname + location.search }}
          endIcon={<ArrowForward />}
          sx={{
            mt: "auto",
            px: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
          aria-label={`Zobacz wydarzenie: ${activity.title}`}
        >
          Zobacz wydarzenie
        </Button>
      </Box>
    </Box>
  );
}
