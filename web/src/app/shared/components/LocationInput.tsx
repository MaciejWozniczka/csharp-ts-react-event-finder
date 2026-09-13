import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

function getLocationErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") return undefined;

  const locationError = error as {
    message?: string;
    city?: { message?: string };
    venue?: { message?: string };
    latitude?: { message?: string };
    longitude?: { message?: string };
  };

  return (
    locationError.message ||
    locationError.city?.message ||
    locationError.venue?.message ||
    locationError.latitude?.message ||
    locationError.longitude?.message
  );
}

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);

  const inputValue = useMemo(() => {
    if (field.value && typeof field.value === "object") {
      return field.value.venue || "";
    }

    return field.value || "";
  }, [field.value]);

  const locationApiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${locationApiKey}&limit=5&dedupe=1&`;

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }

        setLoading(true);

        try {
          const res = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}q=${encodeURIComponent(query)}`,
          );
          setSuggestions(res.data);
        } catch (e) {
          console.error("Error fetching suggestions:", e);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationUrl],
  );

  useEffect(() => fetchSuggestions.clear, [fetchSuggestions]);

  const handleChange = (value: string) => {
    field.onChange(value);
    fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village ||
      location.address?.municipality ||
      location.address?.city_district ||
      location.address?.state_district ||
      location.address?.county ||
      location.display_place;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={field.onBlur}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={getLocationErrorMessage(fieldState.error)}
      />
      {loading && <Typography>Wyszukiwanie lokalizacji…</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
