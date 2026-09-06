import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { formatActivityDate } from "../../../app/utils/formatDate";
import { Link } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? "Jesteś organizatorem" : "Bierzesz udział";
  const isCancelled = activity.isCancelled;
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Card
      elevation={3}
      sx={{
        border: "1px solid rgba(7, 92, 45, 0.12)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{
            title: {
              sx: { fontWeight: "bold", fontSize: 20 },
            },
          }}
          subheader={
            <>
              Organizowane przez <Link to={`/profile/bob`}>Maciej</Link>
            </>
          }
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 2 }}>
          {(isHost || isGoing) && (
            <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
          )}
          {isCancelled && (
            <Chip label="Odwołane" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, px: 3 }}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography variant="body2">
            {formatActivityDate(activity.date)}
          </Typography>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "grey.200",
            py: 3,
            pl: 3,
          }}
        >
          Uczestnicy
        </Box>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 2.5,
          px: { xs: 2.5, md: 3 },
        }}
      >
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
        >
          Pokaż szczegóły
        </Button>
      </CardContent>
    </Card>
  );
}
