import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignIn from "./components/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SignUp from "./components/SignUp.tsx";
import Welcome from "./components/Welcome.tsx";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Welcome />
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            { 
              path: "signin",
              element: <SignIn />
            },
            {
              path: "signup",
              element: <SignUp />
            }
          ]
        },
        {
          path: "dashboard",
          element: <Dashboard />
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
