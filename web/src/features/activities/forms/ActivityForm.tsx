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
      reset(activity);
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
      <Paper
        sx={{
          border: 1,
          borderColor: "divider",
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
        }}
      >
        <Box
          component="form"
          key={activity?.id ?? "create"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            component="fieldset"
            disabled={saving}
            sx={{
              m: 0,
              p: 0,
              border: 0,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography component="h2" variant="h5">
              Co się wydarzy?
            </Typography>
            <TextField
              {...register("title")}
              label="Nazwa wydarzenia"
              required
              error={!!errors.title}
              helperText={errors.title?.message}
              defaultValue={activity?.title ?? ""}
              placeholder="Np. Sobotni spacer nad Wartą"
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />
            <TextField
              {...register("description")}
              label="Opis wydarzenia"
              required
              multiline
              minRows={4}
              error={!!errors.description}
              helperText={
                errors.description?.message ??
                "Napisz, czego można się spodziewać i co warto zabrać."
              }
              defaultValue={activity?.description ?? ""}
              slotProps={{ htmlInput: { maxLength: 2000 } }}
            />
            <TextField
              select
              {...register("category")}
              label="Kategoria"
              required
              error={!!errors.category}
              helperText={errors.category?.message}
              defaultValue={activity?.category ?? ""}
            >
              {[
                ...new Set([
                  ...categories,
                  ...(activity?.category ? [activity.category] : []),
                ]),
              ].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <Divider />
            <Typography component="h2" variant="h5">
              Kiedy i gdzie?
            </Typography>
            <DateTimeInput
              label="Data i godzina"
              control={control}
              name="date"
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField
                {...register("city")}
                label="Miasto"
                required
                error={!!errors.city}
                helperText={errors.city?.message}
                defaultValue={activity?.city ?? ""}
                slotProps={{ htmlInput: { maxLength: 100 } }}
              />
              <TextField
                {...register("venue")}
                label="Adres"
                required
                error={!!errors.venue}
                helperText={errors.venue?.message}
                defaultValue={activity?.venue ?? ""}
                slotProps={{ htmlInput: { maxLength: 100 } }}
              />
            </Box>
          </Box>
          {(updateActivity.isError || createActivity.isError) && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Nie udało się zapisać wydarzenia. Twoje dane pozostały w
              formularzu. Spróbuj ponownie.
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 4,
            }}
          >
            <Button
              type="button"
              color="inherit"
              disabled={saving}
              onClick={() => navigate(backTo)}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              variant="contained"
              loading={saving}
              startIcon={<Check />}
            >
              {id ? "Zapisz zmiany" : "Utwórz wydarzenie"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
