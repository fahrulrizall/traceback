import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ReceivingTable,
  ReceivingForm,
  PlantForm,
  PlantTable,
  VendorTable,
  VendorForm,
} from "./Pages";
import MainLayout from "./Pages/MainLayout";
import { Login } from "./Components";
import jwt_decode from "jwt-decode";
import { getRefreshToken } from "./API/auth";
import Cookies from "js-cookie";

export default function App() {
  const accessToken = "accessToken";

  const [isValidLogin, setIsValidLogin] = useState(false);
  const accessTokenCookie = Cookies.get(accessToken);

  useEffect(() => {
    if (accessTokenCookie) {
      setIsValidLogin(true);
      const data = jwt_decode(accessTokenCookie);
      if (Date.now() >= data.exp * 1000) {
        getNewToken();
      }
    }
  }, [accessTokenCookie]);

  const getNewToken = async () => {
    getRefreshToken().then((response) => {
      Cookies.remove(accessToken);
      Cookies.set(accessToken, response.data.accessToken);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        {isValidLogin ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="plant" element={<PlantTable />}>
              <Route path="add" element={<PlantForm />} />
              <Route path="view/:uuid" element={<PlantForm />} />
            </Route>
            <Route path="vendor" element={<VendorTable />}>
              <Route path="add" element={<VendorForm />} />
              <Route path="view/:uuid" element={<VendorForm />} />
            </Route>
            <Route path="receiving" element={<ReceivingTable />}>
              <Route path="add" element={<ReceivingForm />} />
              <Route path="view/:uuid" element={<ReceivingForm />} />
            </Route>
          </Route>
        ) : (
          <Route
            path="/"
            element={<Login setIsValidLogin={setIsValidLogin} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
