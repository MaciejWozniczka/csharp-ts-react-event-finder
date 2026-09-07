import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Calendar from "react-calendar";

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && dateKey(date) === value ? date : null;
}

export default function ActivityDateRange({
  from,
  to,
  onChange,
}: {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
}) {
  const [selection, setSelection] = useState<[Date | null, Date | null]>([
    parseDate(from),
    parseDate(to),
  ]);

  return (
    <Box
      component="section"
      aria-labelledby="date-range-heading"
      sx={{ minWidth: 0 }}
    >
      <Typography
        id="date-range-heading"
        component="h2"
        variant="h6"
        sx={{ mb: 1 }}
      >
        Wybierz termin
      </Typography>
      <Typography
        role="status"
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1.5 }}
      >
        {selection[0] && !selection[1]
          ? "Teraz wybierz ostatni dzień zakresu."
          : "Kliknij pierwszy i ostatni dzień w kalendarzu."}
      </Typography>
      <Calendar
        locale="pl-PL"
        selectRange
        allowPartialRange
        value={selection}
        defaultActiveStartDate={parseDate(from) ?? parseDate(to) ?? undefined}
        next2Label={null}
        prev2Label={null}
        nextAriaLabel="Następny miesiąc"
        prevAriaLabel="Poprzedni miesiąc"
        navigationAriaLabel="Zmień miesiąc lub rok"
        navigationAriaLive="polite"
        onChange={(value) => {
          if (!Array.isArray(value)) return;
          setSelection(value);
          if (value[0] && value[1])
            onChange(dateKey(value[0]), dateKey(value[1]));
        }}
      />
      {(from || to || selection[0] || selection[1]) && (
        <Button
          fullWidth
          sx={{ mt: 1.5 }}
          onClick={() => {
            setSelection([null, null]);
            onChange("", "");
          }}
        >
          Wyczyść daty
        </Button>
      )}
    </Box>
  );
}
