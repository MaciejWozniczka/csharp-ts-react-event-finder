import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDasboard from "../../features/activities/dashboard/ActivityDasboard";

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
    <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar onOpenForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
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
  );
}

export default App;
