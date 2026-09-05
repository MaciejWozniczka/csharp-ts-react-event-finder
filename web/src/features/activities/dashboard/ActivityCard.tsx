import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { formatActivityDate } from "../../../app/utils/formatDate";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(7, 92, 45, 0.12)",
        transition: "transform 180ms ease-out, box-shadow 180ms ease-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 14px 28px rgba(20, 57, 35, 0.10)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 }, pb: 1.5 }}>
        <Typography variant="h5" sx={{ mb: 0.75 }}>
          {activity.title}
        </Typography>
        <Typography sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
          {formatActivityDate(activity.date)}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, color: "text.secondary" }}>
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 2.5,
          px: { xs: 2.5, md: 3 },
        }}
      >
        <Chip label={activity.category} color="primary" variant="outlined" />
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Pokaż szczegóły
        </Button>
      </CardActions>
    </Card>
  );
}
