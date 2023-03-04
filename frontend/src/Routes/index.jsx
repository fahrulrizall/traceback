import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../Pages/MainLayout";
import { Login } from "../Components";
import {
  ReceivingTable,
  ReceivingForm,
  PlantForm,
  PlantTable,
  VendorTable,
  VendorForm,
} from "../Pages";

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <>
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
        </Route>

        <Route path="retouching" element={<ReceivingTable />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

export default Routes;
