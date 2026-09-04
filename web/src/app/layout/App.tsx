import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDasboard from "../../features/activities/dashboard/ActivityDasboard";
import theme from "./theme";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((activity) => activity.id === id));
    setEditMode(false);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at 8% 0%, #dff3e5 0, transparent 28rem), #f4f7f3",
          pb: { xs: 4, md: 7 },
        }}
      >
        <NavBar onOpenForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ mt: { xs: 3, md: 5 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant="h4" component="h1" sx={{ mb: 0.75 }}>
              Znajdź coś dla siebie
            </Typography>
            <Typography color="text.secondary">
              Odkrywaj wydarzenia, zapisuj pomysły i planuj swój czas.
            </Typography>
          </Box>
          {!activities && isPending ? (
            <Typography variant="body1" color="text.secondary">
              Ładowanie wydarzeń...
            </Typography>
          ) : (
            <ActivityDasboard
              activities={activities ?? []}
              onSelectActivity={handleSelectActivity}
              onCancelSelectActivity={handleCancelSelectActivity}
              selectedActivity={selectedActivity!}
              editMode={editMode}
              onOpenForm={handleOpenForm}
              onCloseForm={handleCloseForm}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
