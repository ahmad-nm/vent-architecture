import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/public/HomePage/HomePage";
import AppLayout from "@/layouts/AppLayout";
import ProjectsPage from "@/pages/public/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "@/pages/public/ProjectsPage/ProjectDetailsPage/ProjectDetailsPage";
import AboutPage from "@/pages/public/AboutPage/AboutPage";
import ContactPage from "@/pages/public/ContactPage/ContactPage";
import Login from "@/pages/admin/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage/AdminDashboardPage";
import AdminProjectsPage from "@/pages/admin/AdminProjectsPage/AdminProjectsPage";
import AdminProjectCreateEditPage from "@/pages/admin/AdminProjectCreateEditPage/AdminProjectCreateEditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "projects",
        element: <ProjectsPage />,
      },

      {
        path: "projects/:id",
        element: <ProjectDetailsPage />,
      },

      {
        path: "about",
        element: <AboutPage />,
      },

      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "projects",
            element: <AdminProjectsPage />,
          },
          {
            path: "projects/create",
            element: <AdminProjectCreateEditPage />,
          },
          {
            path: "projects/:id/edit",
            element: <AdminProjectCreateEditPage />,
          },
        ],
      },
    ],
  },
]);
