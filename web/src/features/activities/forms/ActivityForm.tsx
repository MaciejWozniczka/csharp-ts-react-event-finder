import { Paper, Typography, Box, TextField, Button } from "@mui/material";

export default function ActivityForm() {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Utwórz aktywność
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField label="Tytuł" />
        <TextField label="Opis" multiline rows={4} />
        <TextField label="Kategoria" />
        <TextField label="Data" type="date" />
        <TextField label="Miasto" />
        <TextField label="Miejsce" />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
          <Button variant="contained" color="success">
            Zapisz
          </Button>
          <Button color="inherit">Anuluj</Button>
        </Box>
      </Box>
    </Paper>
  );
}
