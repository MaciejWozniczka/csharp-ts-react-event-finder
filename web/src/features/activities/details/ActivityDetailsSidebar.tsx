import { useState } from "react";
import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import {
  CalendarTodayOutlined,
  EditOutlined,
  PlaceOutlined,
} from "@mui/icons-material";
import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import { formatActivityDate } from "../../../app/utils/formatDate";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";

export default function ActivityDetailsSidebar({
  activity,
}: {
  activity: Activity;
}) {
  const { updateActivity } = useActivities(activity.id);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const changeStatus = () => {
    setConfirmOpen(false);
    updateActivity.mutate({ ...activity, isCancelled: !activity.isCancelled });
  };
  return (
    <Box
      component="aside"
      aria-label="Termin, miejsce i zarządzanie"
      sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
        position: { md: "sticky" },
        top: 24,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Zaplanuj spotkanie
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
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
      <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
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
      {activity.isCancelled && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          To wydarzenie zostało odwołane.
        </Alert>
      )}
      <Divider sx={{ mb: 2.5 }} />
      <Typography component="h2" variant="h6" sx={{ mb: 1.5 }}>
        Zarządzanie wydarzeniem
      </Typography>
      <Button
        fullWidth
        variant="outlined"
        component={Link}
        to={`/activities/${activity.id}/edit`}
        disabled={updateActivity.isPending}
        startIcon={<EditOutlined />}
      >
        Edytuj wydarzenie
      </Button>
      <Button
        fullWidth
        color={activity.isCancelled ? "primary" : "error"}
        sx={{ mt: 1 }}
        loading={updateActivity.isPending}
        onClick={() =>
          activity.isCancelled ? changeStatus() : setConfirmOpen(true)
        }
      >
        {activity.isCancelled ? "Przywróć wydarzenie" : "Odwołaj wydarzenie"}
      </Button>
      {updateActivity.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Nie udało się zmienić statusu. Spróbuj ponownie.
        </Alert>
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Odwołać wydarzenie?"
        message={`Wydarzenie „${activity.title}” zostanie oznaczone jako odwołane. Możesz je później przywrócić.`}
        confirmText="Odwołaj wydarzenie"
        onClose={() => setConfirmOpen(false)}
        onConfirm={changeStatus}
      />
    </Box>
  );
}
