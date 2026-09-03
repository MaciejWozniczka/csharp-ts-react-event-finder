import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

type Props = {
  activity?: Activity;
  onCloseForm: () => void;
  onSubmitForm: (activity: Activity) => void;
};

type FormValues = Pick<
  Activity,
  "title" | "description" | "category" | "date" | "city" | "venue"
>;

const getFormValues = (activity?: Activity): FormValues => ({
  title: activity?.title ?? "",
  description: activity?.description ?? "",
  category: activity?.category ?? "",
  date: activity?.date ? activity.date.slice(0, 10) : "",
  city: activity?.city ?? "",
  venue: activity?.venue ?? "",
});

export default function ActivityForm({
  activity,
  onCloseForm,
  onSubmitForm,
}: Props) {
  const [values, setValues] = useState(() => getFormValues(activity));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    if (activity) {
      data.id = activity.id;
    }

    onSubmitForm(data as unknown as Activity);
  };

  return (
    <Paper
      elevation={0}
      sx={{ border: "1px solid rgba(7, 92, 45, 0.12)", padding: { xs: 2.5, md: 3.5 } }}
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
          type="date"
          value={values.date}
          onChange={handleChange}
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
          <Button type="submit" variant="contained" color="primary">
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
