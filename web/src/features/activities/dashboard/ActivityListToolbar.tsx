import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { useActivityFilters } from "../../../lib/hooks/useActivityFilters";

type Props = {
  count: number;
  isPending: boolean;
  isError: boolean;
  hasData: boolean;
};

export default function ActivityListToolbar({
  count,
  isPending,
  isError,
  hasData,
}: Props) {
  const { params, changeFilter } = useActivityFilters();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mb: 2.5,
      }}
    >
      <Typography role="status" variant="body2" color="text.secondary">
        {isPending
          ? "Szukamy wydarzeń…"
          : isError && !hasData
            ? "Wydarzenia niedostępne"
            : `Wyniki: ${count}`}
      </Typography>
      <TextField
        select
        size="small"
        label="Sortowanie"
        value={params.get("sort") === "desc" ? "desc" : "asc"}
        onChange={(event) => changeFilter("sort", event.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="asc">Data: rosnąco</MenuItem>
        <MenuItem value="desc">Data: malejąco</MenuItem>
      </TextField>
    </Box>
  );
}
