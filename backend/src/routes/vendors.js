import express from "express";
import { body, query } from "express-validator";
import VendorController from "../controller/vendors.js";

const vendorRoutes = express.Router();

vendorRoutes.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  VendorController.pagedSearchVendors
);
vendorRoutes.post(
  "/",
  [
    body("supplierName").notEmpty().withMessage("supplier name required"),
    body("certificateType").notEmpty().withMessage("certificate type required"),
    body("owner").notEmpty().withMessage("owner required"),
    body("rawMaterialType").notEmpty().withMessage("material type required"),
  ],
  VendorController.createNewVendor
);
vendorRoutes.patch(
  "/:uuid",
  [
    body("supplierName").notEmpty().withMessage("supplier name required"),
    body("certificateType").notEmpty().withMessage("certificate type required"),
    body("owner").notEmpty().withMessage("owner required"),
    body("rawMaterialType").notEmpty().withMessage("material type required"),
  ],
  VendorController.updateVendor
);
vendorRoutes.delete("/:uuid", VendorController.deleteVendor);
vendorRoutes.get("/:uuid", VendorController.readVendor);

export default vendorRoutes;
