import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Divider,
  MenuItem,
} from "@mui/material";
import { ArrowBack, Check } from "@mui/icons-material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";
import { categories } from "../../../app/utils/categories";
import ActivityLoadState from "../../../app/shared/components/ActivityLoadState";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import { categoryOptions } from "../../../app/utils/categories";

function getCategoryValue(category: Activity['category']): string {
  return typeof category === 'string' ? category : category.value;
}

export default function ActivityForm() {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams();
  const {
    updateActivity,
    createActivity,
    activity,
    isLoadingActivity,
    activityError,
    refetchActivity,
  } = useActivities(id);
  const saving = updateActivity.isPending || createActivity.isPending;
  const backTo = id ? `/activities/${id}` : "/activities";
  const navigate = useNavigate();

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

  const onSubmit = (data: ActivitySchema) => {
    console.log(data);
  };

  if (id && (isLoadingActivity || !activity))
    return (
      <ActivityLoadState
        loading={isLoadingActivity}
        error={activityError}
        onRetry={() => void refetchActivity()}
      />
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Button
        component={Link}
        to={backTo}
        startIcon={<ArrowBack />}
        disabled={saving}
        sx={{ px: 0, mb: 2 }}
      >
        Wróć {id ? "do wydarzenia" : "do wydarzeń"}
      </Button>
      <Typography component="p" variant="overline" color="secondary.main">
        Dobry pomysł zasługuje na spotkanie
      </Typography>
      <Typography component="h1" variant="h2" sx={{ mt: 1 }}>
        {id ? "Edytuj wydarzenie" : "Zaproś do wspólnego czasu."}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Opowiedz, co planujesz. Podaj termin i miejsce, żeby inni mogli
        zaplanować swój czas.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          name="description"
          control={control}
          multiline
          rows={3}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>
        <LocationInput
          control={control}
          label="Enter the location"
          name="location"
        />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="inherit">Cancel</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            loading={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
