import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { formatActivityDate } from "../../../app/utils/formatDate";

type Props = {
  activity: Activity;
  onCancelActivity: () => void;
  onOpenForm: (id: string) => void;
  onDeleteActivity: (id: string) => void;
};

export default function ActivityDetail({
  activity,
  onCancelActivity,
  onOpenForm,
  onDeleteActivity,
}: Props) {
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
        <Typography variant="h5" sx={{ mb: 0.75 }}>{activity.title}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>
          {formatActivityDate(activity.date)}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 0.5, flexWrap: "wrap" }}>
        <Button color="primary" onClick={() => onOpenForm(activity.id)}>
          Edytuj
        </Button>
        <Button color="error" onClick={() => onDeleteActivity(activity.id)}>
          Usuń
        </Button>
        <Button color="inherit" onClick={onCancelActivity}>
          Wyjdź
        </Button>
      </CardActions>
    </Card>
  );
}
