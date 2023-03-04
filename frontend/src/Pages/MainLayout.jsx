import React from "react";
import { Header, Sidebar } from "../Components";
import { Outlet } from "react-router-dom";
import { ApplicationStoreProvider } from "../Hook/UserHook";

export default function MainLayout() {
  return (
    <div>
      <ApplicationStoreProvider>
        <Header />
        <Sidebar />
        <Outlet />
      </ApplicationStoreProvider>
    </div>
  );
}
