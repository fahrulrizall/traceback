const express = require("express");
const { body, query } = require("express-validator");
const VendorController = require("../controller/vendors.js");

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
vendorRoutes.get("/searchcode/:code", VendorController.getVendorCode);

module.exports = vendorRoutes;
