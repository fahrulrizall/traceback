import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import Login from "../Component/Login";

const Navigation = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route path="/home" element={<Navigation />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </>
  )
);

export default router;
