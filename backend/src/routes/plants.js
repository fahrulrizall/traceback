import express from "express";
import { body, query } from "express-validator";
import PlantContoller from "../controller/plants.js";

const plantRoutes = express.Router();

plantRoutes.get("/", PlantContoller.getAllPlants);
plantRoutes.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  PlantContoller.pagedSearchPlants
);
plantRoutes.post(
  "/",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("location").isLength({ min: 2 }).withMessage("location min 8"),
    body("batchCode").isLength({ min: 2 }).withMessage("batch code min 2"),
  ],
  PlantContoller.createNewPlant
);
plantRoutes.patch(
  "/:uuid",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("location").isLength({ min: 2 }).withMessage("location min 8"),
    body("batchCode").isLength({ min: 2 }).withMessage("batch code min 2"),
  ],
  PlantContoller.updatePlant
);
plantRoutes.delete("/:uuid", PlantContoller.deletePlant);
plantRoutes.get("/:uuid", PlantContoller.readPlant);

export default plantRoutes;
