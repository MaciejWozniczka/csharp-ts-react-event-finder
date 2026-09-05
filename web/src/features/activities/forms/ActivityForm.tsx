import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { type SubmitEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

const toDateTimeLocalValue = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 16);
  }

  const pad = (part: number) => part.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function ActivityForm() {
  const { updateActivity, createActivity } = useActivities();
  const activity = {} as Activity;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid rgba(7, 92, 45, 0.12)",
        padding: { xs: 2.5, md: 3.5 },
      }}
    >
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edytuj aktywność" : "Utwórz aktywność"}
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        onSubmit={handleSubmit}
      >
        <TextField name="title" label="Tytuł" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Opis"
          multiline
          rows={4}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Kategoria"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Data"
          type="datetime-local"
          defaultValue={
            activity?.date ? toDateTimeLocalValue(activity.date) : ""
          }
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField name="city" label="Miasto" defaultValue={activity?.city} />
        <TextField
          name="venue"
          label="Miejsce"
          defaultValue={activity?.venue}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            Zapisz
          </Button>
          <Button color="inherit" onClick={() => {}}>
            Anuluj
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
