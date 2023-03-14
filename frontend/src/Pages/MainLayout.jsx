import React, { useState } from "react";
import { Header, Sidebar } from "../Components";
import { Outlet } from "react-router-dom";
import { ApplicationStoreProvider } from "../Hook/UserHook";

export default function MainLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <div className={isShowSidebar ? "toggle-sidebar" : undefined}>
      <ApplicationStoreProvider>
        <Header setIsShowSidebar={setIsShowSidebar} />
        <Sidebar />
        <Outlet />
      </ApplicationStoreProvider>
    </div>
  );
}
