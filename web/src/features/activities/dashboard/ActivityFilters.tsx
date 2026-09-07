import { ExpandMore, Tune } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { categories as knownCategories } from "../../../app/utils/categories";
import ActivityDateRange from "./ActivityDateRange";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useActivityFilters } from "../../../lib/hooks/useActivityFilters";

export default function ActivityFilters() {
  const { activities } = useActivities();
  const {
    params,
    changeFilter: onChange,
    changeDateRange: onDateRangeChange,
    clearFilters: onClear,
    hasFilters,
  } = useActivityFilters();
  const cities = [
    ...new Set(
      (activities ?? []).map((activity) => activity.city).filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b, "pl"));
  const categories = [
    ...new Set(
      (activities ?? []).map((activity) => activity.category).filter(Boolean),
    ),
  ];
  const wide = useMediaQuery(useTheme().breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const selectedCity = params.get("city") ?? "";
  const selectedCategory = params.get("category") ?? "";
  return (
    <Accordion
      expanded={wide || mobileOpen}
      onChange={(_, expanded) => setMobileOpen(expanded)}
      disableGutters
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: "20px !important",
        "&::before": { display: "none" },
        position: { md: "sticky" },
        top: 24,
      }}
    >
      <AccordionSummary
        expandIcon={wide ? undefined : <ExpandMore />}
        aria-controls="event-filters"
        id="event-filters-heading"
        sx={{ px: 2.5, minHeight: 64 }}
      >
        <Tune sx={{ mr: 1.25, color: "primary.main" }} />
        <Typography sx={{ fontWeight: 700 }}>
          Dopasuj do siebie{hasFilters ? " •" : ""}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="event-filters" sx={{ px: 2.5, pb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            select
            fullWidth
            label="Kategoria"
            value={selectedCategory}
            onChange={(e) => onChange("category", e.target.value)}
          >
            <MenuItem value="">Wszystkie kategorie</MenuItem>
            {[
              ...new Set([
                ...knownCategories,
                ...categories,
                ...(selectedCategory ? [selectedCategory] : []),
              ]),
            ].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Miasto"
            value={selectedCity}
            onChange={(e) => onChange("city", e.target.value)}
          >
            <MenuItem value="">Wszystkie miasta</MenuItem>
            {[
              ...new Set([...cities, ...(selectedCity ? [selectedCity] : [])]),
            ].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          <ActivityDateRange
            key={`${params.get("from") ?? params.get("date") ?? ""}:${params.get("to") ?? params.get("date") ?? ""}`}
            from={params.get("from") ?? params.get("date") ?? ""}
            to={params.get("to") ?? params.get("date") ?? ""}
            onChange={onDateRangeChange}
          />
          <TextField
            select
            fullWidth
            label="Status wydarzenia"
            value={
              ["active", "cancelled"].includes(params.get("status") ?? "")
                ? params.get("status")
                : ""
            }
            onChange={(e) => onChange("status", e.target.value)}
          >
            <MenuItem value="">Wszystkie statusy</MenuItem>
            <MenuItem value="active">Nieodwołane</MenuItem>
            <MenuItem value="cancelled">Odwołane</MenuItem>
          </TextField>
          <Button variant="text" onClick={onClear} disabled={!hasFilters}>
            Wyczyść filtry
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
