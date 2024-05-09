"use-client";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Welcome from "./components/Welcome.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NewRequest from "./components/NewRequest.tsx";
import UserRequestView from "./components/UserRequestView.tsx";
import AdminReportView from "./components/AdminReportView.tsx";
import AppContextProvider from "./contexts/AppContextProvider.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "user",
            element: <UserDashboard />,
          },
          {
            path: "admin",
            element: <AdminDashboard />,
          },
          {
            path: "new-request",
            element: <NewRequest />,
          },
          {
            path: "view-user-req/:id",
            element: <UserRequestView />,
          },
          {
            path: "view-admin-rep/:id",
            element: <AdminReportView />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
