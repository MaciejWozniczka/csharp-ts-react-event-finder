import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity?: Activity;
  onCloseForm: () => void;
  onCreateActivity: (activity: Activity) => void;
};

type FormValues = Pick<
  Activity,
  "title" | "description" | "category" | "date" | "city" | "venue"
>;

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

const getFormValues = (activity?: Activity): FormValues => ({
  title: activity?.title ?? "",
  description: activity?.description ?? "",
  category: activity?.category ?? "",
  date: activity?.date ? toDateTimeLocalValue(activity.date) : "",
  city: activity?.city ?? "",
  venue: activity?.venue ?? "",
});

export default function ActivityForm({
  activity,
  onCloseForm,
  onCreateActivity,
}: Props) {
  const { updateActivity, createActivity } = useActivities();

  const [values, setValues] = useState(() => getFormValues(activity));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

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
      onCloseForm();
    } else {
      const id = await createActivity.mutateAsync(data as unknown as Activity);
      onCreateActivity({ ...data, id } as Activity);
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
        <TextField
          name="title"
          label="Tytuł"
          value={values.title}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Opis"
          multiline
          rows={4}
          value={values.description}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="Kategoria"
          value={values.category}
          onChange={handleChange}
        />
        <TextField
          name="date"
          label="Data"
          type="datetime-local"
          value={values.date}
          onChange={handleChange}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          name="city"
          label="Miasto"
          value={values.city}
          onChange={handleChange}
        />
        <TextField
          name="venue"
          label="Miejsce"
          value={values.venue}
          onChange={handleChange}
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
          <Button color="inherit" onClick={onCloseForm}>
            Anuluj
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
