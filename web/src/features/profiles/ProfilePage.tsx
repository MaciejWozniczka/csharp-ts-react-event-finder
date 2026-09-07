import { useState } from "react";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { useDemoCommunity } from "../../lib/hooks/useDemoCommunity";
import ProfileForm from "./forms/ProfileForm";
import ProfileDetailsHeader from "./details/ProfileDetailsHeader";
import ProfileDetailsInfo from "./details/ProfileDetailsInfo";
export default function ProfilePage() {
  const { username } = useParams();
  const { profile, saveProfile } = useDemoCommunity();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  if (username && !["maciej", "username", "bob"].includes(username))
    return (
      <Alert severity="info">
        Nie znaleziono profilu.{" "}
        <Link to="/profiles/maciej">Przejdź do profilu demonstracyjnego</Link>.
      </Alert>
    );

  return (
    <Box sx={{ maxWidth: 880, mx: "auto" }}>
      <Button
        component={Link}
        to="/activities"
        startIcon={<ArrowBack />}
        sx={{ px: 0, mb: 2 }}
      >
        Wróć do wydarzeń
      </Button>
      <Paper
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <ProfileDetailsHeader
          profile={profile}
          editing={editing}
          onEdit={() => {
            setEditing(true);
            setSaved(false);
          }}
        />
        <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            To podgląd funkcji społecznościowych. Zmiany profilu i komentarze są
            zapisywane tylko w tej przeglądarce.
          </Typography>
          {saved && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Profil został zapisany.
            </Alert>
          )}
          {editing ? (
            <ProfileForm
              profile={profile}
              onCancel={() => setEditing(false)}
              onSave={(draft) => {
                if (!saveProfile(draft)) return false;
                setEditing(false);
                setSaved(true);
                return true;
              }}
            />
          ) : (
            <ProfileDetailsInfo profile={profile} />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
