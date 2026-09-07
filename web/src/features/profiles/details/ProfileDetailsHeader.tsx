import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import { EditOutlined, PlaceOutlined } from "@mui/icons-material";
import type { DemoProfile } from "../../../lib/types/demoCommunity";
export default function ProfileDetailsHeader({
  profile,
  editing,
  onEdit,
}: {
  profile: DemoProfile;
  editing: boolean;
  onEdit: () => void;
}) {
  return (
    <Box sx={{ bgcolor: "primary.light", px: { xs: 2.5, sm: 4 }, py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Avatar
          src="/images/user.png"
          alt={profile.name}
          sx={{ width: 88, height: 88, bgcolor: "primary.main" }}
        >
          {profile.name.slice(0, 1)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 160 }}>
          <Chip
            label="Profil demonstracyjny"
            size="small"
            variant="outlined"
            sx={{ mb: 1.5 }}
          />
          <Typography
            component="h1"
            variant="h2"
            sx={{ overflowWrap: "anywhere" }}
          >
            {profile.name}
          </Typography>
          {profile.city && (
            <Typography
              sx={{
                display: "flex",
                gap: 0.75,
                alignItems: "center",
                mt: 1,
                overflowWrap: "anywhere",
              }}
            >
              <PlaceOutlined fontSize="small" />
              {profile.city}
            </Typography>
          )}
        </Box>
        {!editing && (
          <Button
            variant="outlined"
            startIcon={<EditOutlined />}
            onClick={onEdit}
          >
            Edytuj profil
          </Button>
        )}
      </Box>
    </Box>
  );
}
