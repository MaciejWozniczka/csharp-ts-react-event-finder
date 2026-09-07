import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, EditOutlined, PlaceOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import {
  useDemoCommunity,
  type DemoProfile,
} from "../../lib/hooks/useDemoCommunity";
import { categories } from "../../app/utils/categories";

function ProfileEditor({
  profile,
  onSave,
  onCancel,
}: {
  profile: DemoProfile;
  onSave: (profile: DemoProfile) => boolean;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState(false);
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.name.trim()) return;
        setError(
          !onSave({
            ...draft,
            name: draft.name.trim(),
            city: draft.city.trim(),
            bio: draft.bio.trim(),
          }),
        );
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <Typography component="h2" variant="h4">
        Edytuj profil
      </Typography>
      <TextField
        label="Wyświetlana nazwa"
        required
        value={draft.name}
        onChange={(event) => setDraft({ ...draft, name: event.target.value })}
        slotProps={{ htmlInput: { maxLength: 60, pattern: ".*\\S.*" } }}
      />
      <TextField
        label="Miasto"
        value={draft.city}
        onChange={(event) => setDraft({ ...draft, city: event.target.value })}
        slotProps={{ htmlInput: { maxLength: 100 } }}
      />
      <TextField
        label="O mnie"
        multiline
        minRows={3}
        value={draft.bio}
        onChange={(event) => setDraft({ ...draft, bio: event.target.value })}
        slotProps={{ htmlInput: { maxLength: 600 } }}
      />
      <Box>
        <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
          Zainteresowania
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {categories.map((category) => (
            <Button
              key={category}
              size="small"
              aria-pressed={draft.interests.includes(category)}
              variant={
                draft.interests.includes(category) ? "contained" : "outlined"
              }
              onClick={() =>
                setDraft({
                  ...draft,
                  interests: draft.interests.includes(category)
                    ? draft.interests.filter((item) => item !== category)
                    : [...draft.interests, category],
                })
              }
            >
              {category}
            </Button>
          ))}
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          Nie udało się zapisać profilu w przeglądarce. Sprawdź, czy zezwala ona
          na przechowywanie danych.
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={onCancel}>Anuluj</Button>
        <Button type="submit" variant="contained" disabled={!draft.name.trim()}>
          Zapisz profil
        </Button>
      </Box>
    </Box>
  );
}

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
                onClick={() => {
                  setEditing(true);
                  setSaved(false);
                }}
              >
                Edytuj profil
              </Button>
            )}
          </Box>
        </Box>
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
            <ProfileEditor
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
          )}
        </Box>
      </Paper>
    </Box>
  );
}
