const express = require("express");
const { body, query } = require("express-validator");

const UserController = require("../controller/users");

const router = express.Router();

router.post(
  "/",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("email").isEmail().withMessage("invalid email address"),
    body("username").isLength({ min: 8 }).withMessage("username min 8"),
    body("password").isLength({ min: 8 }).withMessage("password min 8"),
  ],
  UserController.createNewUser
);
router.get(
  "/search",
  [query("pageIndex").not().isEmpty(), query("pageSize").not().isEmpty()],
  UserController.pagedSearchUsers
);
router.patch(
  "/:uuid",
  [
    body("name").isLength({ min: 3 }).withMessage("name min 3"),
    body("email").isEmail().withMessage("invalid email address"),
    body("username").isLength({ min: 8 }).withMessage("username min 8"),
  ],
  UserController.updateUser
);
router.delete("/:uuid", UserController.deleteUser);
router.get("/:uuid", UserController.readUser);

module.exports = router;
