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
    body("materialType").notEmpty().withMessage("material type required"),
    body("fairtradeNo").notEmpty().withMessage("fair trade no required"),
  ],
  VendorController.createNewVendor
);
vendorRoutes.patch(
  "/:uuid",
  [
    body("name").notEmpty().withMessage("name required"),
    body("certificateType").notEmpty().withMessage("certificate type required"),
    body("owner").isLength({ min: 8 }).withMessage("owner required"),
    body("materialType")
      .isLength({ min: 8 })
      .withMessage("material type required"),
    body("fairtradeNo")
      .isLength({ min: 8 })
      .withMessage("fair trade no required"),
  ],
  VendorController.updateVendor
);
vendorRoutes.delete("/:uuid", VendorController.deleteVendor);
vendorRoutes.get("/:uuid", VendorController.readVendor);

export default vendorRoutes;
