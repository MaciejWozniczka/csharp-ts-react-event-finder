import { Container, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

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
        <List>
          {activities.map((a) => (
            <ListItem key={a.id}>
              <ListItemText>{a.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
