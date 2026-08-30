import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/activities")
      .then((response) => response.json())
      .then((data) => setActivities(data));
  }, []);

  return (
    <div>
      <h3>Event Finder</h3>
      <ul>
        {activities.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
