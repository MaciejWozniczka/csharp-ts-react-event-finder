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
};

export default function ActivityDetail({ activity }: Props) {
  return (
    <Card sx={{ borderradius: 3 }}>
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
        <Button color="primary">Edytuj</Button>
        <Button color="inherit">Wyjdź</Button>
      </CardActions>
    </Card>
  );
}
