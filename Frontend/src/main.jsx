import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCopyPasta from "./pages/CreateCopyPasta.jsx";
import ViewCopyPasta from "./pages/DetailsCopyPasta.jsx";
import EditCopyPasta from "./pages/EditCopyPasta.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <CreateCopyPasta />,
  },
  {
    path: "/:id",
    element: <ViewCopyPasta />,
  },
  {
    path: "/edit/:id",
    element: <EditCopyPasta />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
