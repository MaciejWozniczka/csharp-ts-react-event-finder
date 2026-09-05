import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";
import { formatActivityDate } from "../../../app/utils/formatDate";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDetail() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { deleteActivity, activity, isLoadingActivity } = useActivities(
    id ?? "",
  );

  const handleDelete = () => {
    if (activity) {
      deleteActivity.mutate(activity.id, {
        onSuccess: () => navigate("/activities"),
      });
    }
  };

  if (isLoadingActivity) {
    return <Typography>Ładowanie...</Typography>;
  }

  if (!activity) {
    return null;
  }

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid rgba(7, 92, 45, 0.12)", overflow: "hidden" }}
    >
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 0.75 }}>
          {activity.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
        >
          {formatActivityDate(activity.date)}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 0.5, flexWrap: "wrap" }}>
        <Button
          component={Link}
          to={`/activities/${activity.id}/edit`}
          color="primary"
        >
          Edytuj
        </Button>
        <Button
          color="error"
          onClick={() => setIsDeleteDialogOpen(true)}
          loading={deleteActivity.isPending}
        >
          Usuń
        </Button>
        <Button color="inherit" onClick={() => navigate("/activities")}>
          Wyjdź
        </Button>
      </CardActions>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Usuń wydarzenie"
        message={`Czy na pewno chcesz usunąć wydarzenie „${activity.title}”?`}
        confirmText="Usuń"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          handleDelete();
        }}
      />
    </Card>
  );
}
