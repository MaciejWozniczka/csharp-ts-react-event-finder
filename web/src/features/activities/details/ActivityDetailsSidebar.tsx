import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import { Link } from "react-router";
import { useDemoCommunity } from "../../../lib/hooks/useDemoCommunity";

export default function ActivityDetailsSidebar() {
  const { profile } = useDemoCommunity();
  return (
    <Box
      component="aside"
      aria-label="Społeczność wydarzenia"
      sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
        position: { md: "sticky" },
        top: 24,
      }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 2.5 }}>
        Społeczność
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Avatar
          component={Link}
          to="/profiles/maciej"
          aria-label={`Profil: ${profile.name}`}
          src="/images/user.png"
          sx={{ width: 48, height: 48 }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component={Link}
            to="/profiles/maciej"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              fontWeight: 700,
              overflowWrap: "anywhere",
            }}
          >
            {profile.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflowWrap: "anywhere" }}
          >
            {profile.city}
          </Typography>
        </Box>
      </Box>
      <Chip
        size="small"
        variant="outlined"
        label="Profil demonstracyjny"
        sx={{ mb: 1.5 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Podgląd części społecznościowej. Zapisy na wydarzenia nie są jeszcze
        dostępne.
      </Typography>
      <Button
        component={Link}
        to="/profiles/maciej"
        variant="outlined"
        fullWidth
      >
        Zobacz profil
      </Button>
    </Box>
  );
}
