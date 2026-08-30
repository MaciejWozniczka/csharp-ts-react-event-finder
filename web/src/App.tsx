import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <>
      <Typography variant="h3">Event Finder</Typography>
      <List>
        {activities.map((a) => (
          <ListItem key={a.id}>
            <ListItemText>{a.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
