import { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";

export default function ActivityDetailsActions({
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
    <Box sx={{ mt: 3 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 1.5 }}>
        Zarządzanie wydarzeniem
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Button
          variant="outlined"
          component={Link}
          to={`/activities/${activity.id}/edit`}
          disabled={updateActivity.isPending}
          startIcon={<EditOutlined />}
        >
          Edytuj wydarzenie
        </Button>
        <Button
          color={activity.isCancelled ? "primary" : "error"}
          loading={updateActivity.isPending}
          onClick={() =>
            activity.isCancelled ? changeStatus() : setConfirmOpen(true)
          }
        >
          {activity.isCancelled ? "Przywróć wydarzenie" : "Odwołaj wydarzenie"}
        </Button>
      </Box>
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
