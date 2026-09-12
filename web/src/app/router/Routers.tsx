import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/activities/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDasboard.tsx";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage.tsx";
import ProfilePage from "../../features/profiles/ProfilePage";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetailsPage /> },
      { path: "activities/create", element: <ActivityForm key="create" /> },
      { path: "activities/:id/edit", element: <ActivityForm /> },
      { path: "profiles/:username", element: <ProfilePage /> },
      { path: "profile/:username", element: <ProfilePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
    ],
  },
]);
