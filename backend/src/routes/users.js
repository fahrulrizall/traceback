const express = require("express");
const { body, query } = require("express-validator");
const UserController = require("../controller/users.js");

const userRoutes = express.Router();

userRoutes.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  UserController.pagedSearchUsers
);
userRoutes.post(
  "/",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("email").isEmail().withMessage("invalid email address"),
    body("username").isLength({ min: 8 }).withMessage("username min 8"),
    body("password").isLength({ min: 8 }).withMessage("password min 8"),
  ],
  UserController.createNewUser
);
userRoutes.patch(
  "/:uuid",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("email").isEmail().withMessage("invalid email address"),
  ],
  UserController.updateUser
);
userRoutes.delete("/:uuid", UserController.deleteUser);
userRoutes.get("/:uuid", UserController.readUser);

module.exports = userRoutes;
