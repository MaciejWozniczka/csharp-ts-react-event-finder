import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  onSelectActivity: (id: string) => void;
};

export default function ActivityCard({
  activity,
  onSelectActivity,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingbottom: 2,
        }}
      >
        <Chip label={activity.category} variant="outlined" />
        <Button
          size="medium"
          variant="contained"
          onClick={() => onSelectActivity(activity.id)}
        >
          Pokaż szczegóły
        </Button>
      </CardActions>
    </Card>
  );
}
