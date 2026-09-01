import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDasboard from "../../features/activities/ActivityDasboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <ActivityDasboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
