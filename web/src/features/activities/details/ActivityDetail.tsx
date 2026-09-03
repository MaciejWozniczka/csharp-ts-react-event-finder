import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

type Props = {
  activity: Activity;
  onCancelActivity: () => void;
  onOpenForm: (id: string) => void;
};

export default function ActivityDetail({
  activity,
  onCancelActivity,
  onOpenForm,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => onOpenForm(activity.id)}>
          Edytuj
        </Button>
        <Button color="inherit" onClick={onCancelActivity}>
          Wyjdź
        </Button>
      </CardActions>
    </Card>
  );
}
