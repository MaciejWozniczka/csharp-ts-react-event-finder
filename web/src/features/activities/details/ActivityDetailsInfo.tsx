import { Box, Typography } from "@mui/material";

export default function ActivityDetailsInfo({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <Box component="section" aria-labelledby="about-event" sx={{ mb: 4 }}>
      <Typography variant="h3" component="h2" id="about-event" sx={{ mb: 2 }}>
        O wydarzeniu
      </Typography>
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          maxWidth: "70ch",
          color: "text.secondary",
        }}
      >
        {activity.description ||
          "Organizator nie dodał jeszcze opisu wydarzenia."}
      </Typography>
    </Box>
  );
}
