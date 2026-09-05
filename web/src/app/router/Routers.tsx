import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/activities/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDasboard.tsx";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetail /> },
      { path: "activities/create", element: <ActivityForm key="create" /> },
      { path: "activities/:id/edit", element: <ActivityForm /> },
    ],
  },
]);
