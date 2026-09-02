import { Paper, Typography, Box, TextField, Button } from "@mui/material";

type Props = {
  activity?: Activity;
  onCloseForm: () => void;
};

export default function ActivityForm({ activity, onCloseForm }: Props) {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Utwórz aktywność
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField label="Tytuł" value={activity?.title || ""} />
        <TextField
          label="Opis"
          multiline
          rows={4}
          value={activity?.description || ""}
        />
        <TextField label="Kategoria" value={activity?.category || ""} />
        <TextField label="Data" type="date" value={activity?.date || ""} />
        <TextField label="Miasto" value={activity?.city || ""} />
        <TextField label="Miejsce" value={activity?.venue || ""} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
          <Button variant="contained" color="success">
            Zapisz
          </Button>
          <Button color="inherit" onClick={onCloseForm}>
            Anuluj
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
