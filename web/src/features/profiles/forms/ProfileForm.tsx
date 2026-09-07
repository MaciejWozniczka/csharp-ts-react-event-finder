import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { categories } from "../../../app/utils/categories";
import type { DemoProfile } from "../../../lib/types/demoCommunity";
export default function ProfileForm({
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
