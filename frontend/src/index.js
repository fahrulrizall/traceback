import "./style.css";
import "./style.custom.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Routes} />);
