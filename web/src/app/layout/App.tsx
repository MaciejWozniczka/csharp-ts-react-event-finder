import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDasboard from "../../features/activities/dashboard/ActivityDasboard";

const theme = createTheme({
  palette: {
    primary: { main: "#075c2d", dark: "#003d1c", light: "#d7f1e2" },
    secondary: { main: "#d97706", dark: "#a64d08", light: "#ffedca" },
    background: { default: "#f4f7f3", paper: "#fcfdfb" },
    text: { primary: "#173226", secondary: "#617267" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.03em" },
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((activity) => activity.id === id));
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

  const handleDeleteActivity = (id: string) => {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== id),
    );

    if (selectedActivity?.id === id) {
      setSelectedActivity(undefined);
      setEditMode(false);
    }
  };

  const handleSubmitForm = (activity: Activity) => {
    const existingActivity = activities.find(
      (currentActivity) => currentActivity.id === activity.id,
    );
    const savedActivity = existingActivity
      ? { ...existingActivity, ...activity }
      : { ...activity, id: crypto.randomUUID() };

    setActivities((currentActivities) =>
      existingActivity
        ? currentActivities.map((currentActivity) =>
            currentActivity.id === savedActivity.id
              ? savedActivity
              : currentActivity,
          )
        : [...currentActivities, savedActivity],
    );

    setEditMode(false);
    setSelectedActivity(savedActivity);
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
          <ActivityDasboard
            activities={activities}
            onSelectActivity={handleSelectActivity}
            onDeleteActivity={handleDeleteActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity!}
            editMode={editMode}
            onOpenForm={handleOpenForm}
            onCloseForm={handleCloseForm}
            onSubmitForm={handleSubmitForm}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
