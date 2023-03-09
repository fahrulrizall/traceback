const express = require("express");
const { body, query } = require("express-validator");
const TrimmingContoller = require("../controller/trimming.js");

const trimmingRoutes = express.Router();

trimmingRoutes.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  TrimmingContoller.pagedSearchTrimming
);
trimmingRoutes.post(
  "/",
  [
    body("trimmingDate").notEmpty().withMessage("trimming date mandatory"),
    body("weight").notEmpty().withMessage("weight date mandatory"),
    body("size").notEmpty().withMessage("size date mandatory"),
    body("remarks").notEmpty().withMessage("remarks date mandatory"),
    body("idReceiving").notEmpty().withMessage("idReceiving date mandatory"),
    body("idVendor").notEmpty().withMessage("idVendor date mandatory"),
  ],
  TrimmingContoller.createNewTrimming
);
trimmingRoutes.patch(
  "/:uuid",
  [
    body("trimmingDate").notEmpty().withMessage("trimming date mandatory"),
    body("weight").notEmpty().withMessage("weight date mandatory"),
    body("size").notEmpty().withMessage("size date mandatory"),
    body("remarks").notEmpty().withMessage("remarks date mandatory"),
    body("idReceiving").notEmpty().withMessage("idReceiving date mandatory"),
    body("idVendor").notEmpty().withMessage("idVendor date mandatory"),
  ],
  TrimmingContoller.updateTrimming
);
trimmingRoutes.delete("/:uuid", TrimmingContoller.deleteTrimming);
trimmingRoutes.get("/:uuid", TrimmingContoller.readTrimming);

module.exports = trimmingRoutes;
