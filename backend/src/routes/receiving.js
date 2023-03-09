const express = require("express");
const { body, query } = require("express-validator");
const ReceivingContoller = require("../controller/receiving.js");

const receivingRoutes = express.Router();

receivingRoutes.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  ReceivingContoller.pagedSearchReceiving
);
receivingRoutes.post(
  "/",
  [
    body("receivingDate").notEmpty().withMessage("receiving date mandatory"),
    body("pcs").notEmpty().withMessage("pcs date mandatory"),
    body("grade").notEmpty().withMessage("grade date mandatory"),
    body("size").notEmpty().withMessage("size date mandatory"),
    body("weight").notEmpty().withMessage("weight date mandatory"),
  ],
  ReceivingContoller.createNewReceiving
);
receivingRoutes.patch(
  "/:uuid",
  [
    body("receivingDate").notEmpty(),
    body("pcs").notEmpty(),
    body("grade").notEmpty(),
    body("size").notEmpty(),
    body("weight").notEmpty(),
  ],
  ReceivingContoller.updateReceiving
);
receivingRoutes.delete("/:uuid", ReceivingContoller.deleteReceiving);
receivingRoutes.get("/:uuid", ReceivingContoller.readReceiving);

module.exports = receivingRoutes;
