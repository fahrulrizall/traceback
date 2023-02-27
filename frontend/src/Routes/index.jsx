import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Header, Sidebar, Footer, Login } from "../Components";

const Navigation = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <h1>wlcome</h1>
      <Footer />
    </div>
  );
};

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigation />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);

export default Routes;
