import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import { categoryOptions } from "../../../app/utils/categories";

function getCategoryValue(category: Activity['category']): string {
  return typeof category === 'string' ? category : category.value;
}

function getSaveErrorMessage(error: unknown) {
  if (Array.isArray(error)) {
    return error.filter((message): message is string => typeof message === "string").join(" ");
  }

  return "Nie udało się zapisać wydarzenia. Spróbuj ponownie.";
}

export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        category: getCategoryValue(activity.category),
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    if (activity) {
      updateActivity.mutate({ ...activity, ...flattenedData } as Activity, {
        onSuccess: () => navigate(`/activities/${activity.id}`),
      });
    } else {
      createActivity.mutate(flattenedData as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        },
      });
    }
  };

  if (isLoadingActivity) return <Typography>Wczytywanie wydarzenia…</Typography>;

  const saveError = updateActivity.error ?? createActivity.error;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edytuj wydarzenie" : "Dodaj wydarzenie"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextInput label="Tytuł" control={control} name="title" />
        <TextInput
          label="Opis"
          name="description"
          control={control}
          multiline
          rows={3}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <SelectInput
            items={categoryOptions}
            label="Kategoria"
            control={control}
            name="category"
          />
          <DateTimeInput label="Data i godzina" control={control} name="date" />
        </Box>
        <LocationInput
          control={control}
          label="Lokalizacja"
          name="location"
        />
        {saveError && <Alert severity="error">{getSaveErrorMessage(saveError)}</Alert>}
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button
            color="inherit"
            onClick={() => navigate(activity ? `/activities/${activity.id}` : "/activities")}
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
