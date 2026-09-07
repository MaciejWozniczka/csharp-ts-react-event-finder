import { Box, Chip, Typography } from "@mui/material";
import { Link } from "react-router";
import type { DemoProfile } from "../../../lib/types/demoCommunity";
export default function ProfileDetailsInfo({
  profile,
}: {
  profile: DemoProfile;
}) {
  return (
    <>
      <Typography component="h2" variant="h4" sx={{ mb: 1.5 }}>
        O mnie
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", mb: 4 }}
      >
        {profile.bio || "Dodaj kilka słów o sobie, edytując profil."}
      </Typography>
      <Typography component="h2" variant="h4" sx={{ mb: 1.5 }}>
        Lubię spędzać czas na…
      </Typography>
      {profile.interests.length ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {profile.interests.map((category) => (
            <Chip
              key={category}
              component={Link}
              clickable
              to={`/activities?category=${encodeURIComponent(category)}`}
              label={category}
              sx={{ bgcolor: "primary.light", minHeight: 44 }}
            />
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">
          Wybierz zainteresowania podczas edycji profilu.
        </Typography>
      )}
    </>
  );
}
