import { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";

type ConfirmationAction = "cancel" | "delete";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsActions({ activity }: Props) {
  const { updateActivity, deleteActivity } = useActivities(activity.id);
  const navigate = useNavigate();
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction | null>(null);
  const isPending = updateActivity.isPending || deleteActivity.isPending;

  const confirmations = {
    cancel: {
      title: "Odwołać wydarzenie?",
      message: `Wydarzenie „${activity.title}” zostanie oznaczone jako odwołane. Możesz je później przywrócić.`,
      confirmText: "Odwołaj wydarzenie",
    },
    delete: {
      title: "Usunąć wydarzenie?",
      message: `Wydarzenie „${activity.title}” zostanie trwale usunięte. Tej operacji nie można cofnąć.`,
      confirmText: "Usuń wydarzenie",
    },
  };

  const closeConfirmation = () => setConfirmationAction(null);

  const changeStatus = () => {
    if (isPending) return;
    if (activity.isCancelled) {
      updateActivity.mutate({ ...activity, isCancelled: false });
    } else {
      setConfirmationAction("cancel");
    }
  };

  const confirmAction = () => {
    if (isPending || !confirmationAction) return;
    closeConfirmation();

    if (confirmationAction === "delete") {
      if (!activity.isCancelled) return;
      deleteActivity.mutate(activity.id, {
        onSuccess: () => navigate("/activities", { replace: true }),
      });
    } else {
      updateActivity.mutate({ ...activity, isCancelled: true });
    }
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
          disabled={isPending}
          startIcon={<EditOutlined />}
        >
          Edytuj wydarzenie
        </Button>
        <Button
          color={activity.isCancelled ? "primary" : "error"}
          loading={updateActivity.isPending}
          disabled={deleteActivity.isPending}
          onClick={changeStatus}
        >
          {activity.isCancelled ? "Przywróć wydarzenie" : "Odwołaj wydarzenie"}
        </Button>
        {activity.isCancelled && (
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlined />}
            loading={deleteActivity.isPending}
            disabled={updateActivity.isPending}
            onClick={() => setConfirmationAction("delete")}
          >
            Usuń wydarzenie
          </Button>
        )}
      </Box>
      {deleteActivity.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Nie udało się usunąć wydarzenia. Spróbuj ponownie.
        </Alert>
      )}
      {updateActivity.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Nie udało się zmienić statusu. Spróbuj ponownie.
        </Alert>
      )}
      {confirmationAction && (
        <ConfirmDialog
          open
          {...confirmations[confirmationAction]}
          onClose={closeConfirmation}
          onConfirm={confirmAction}
        />
      )}
    </Box>
  );
}
