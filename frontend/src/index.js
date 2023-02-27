import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>
);
