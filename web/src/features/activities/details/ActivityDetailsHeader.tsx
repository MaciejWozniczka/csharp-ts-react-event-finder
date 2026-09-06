import { Card, Badge, CardMedia, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { formatActivityDate } from "../../../app/utils/formatDate";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsHeader({ activity }: Props) {
  const isCancelled = false;
  const isHost = true;
  const isGoing = true;
  const loading = false;

  return (
    <Card
      sx={{
        position: "relative",
        mb: 2,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {isCancelled && (
        <Badge
          sx={{ position: "absolute", left: 40, top: 20, zIndex: 1000 }}
          color="error"
          badgeContent="Cancelled"
        />
      )}
      <CardMedia
        component="img"
        height="300"
        image={`/images/categoryImages/${activity.category}.jpg`}
        alt={`${activity.category} image`}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          color: "white",
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)",
          boxSizing: "border-box",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {activity.title}
          </Typography>
          <Typography variant="subtitle1">
            {formatActivityDate(activity.date)}
          </Typography>
          <Typography variant="subtitle2">
            Organizowane przez{" "}
            <Link
              to={`/profiles/username`}
              style={{ color: "white", fontWeight: "bold" }}
            >
              Maciej
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {isHost ? (
            <>
              <Button
                variant="contained"
                color={isCancelled ? "success" : "error"}
                onClick={() => {}}
              >
                {isCancelled ? "Przywróć wydarzenie" : "Anuluj wydarzenie"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/manage/${activity.id}`}
                disabled={isCancelled}
              >
                Zarządzaj wydarzeniem
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color={isGoing ? "primary" : "info"}
              onClick={() => {}}
              disabled={isCancelled || loading}
            >
              {isGoing ? "Anuluj udział" : "Dołącz do wydarzenia"}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
