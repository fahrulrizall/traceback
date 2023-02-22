const express = require("express");

const UserController = require("../controller/users");

const router = express.Router();

router.post("/", UserController.createNewUser);
router.get("/search", UserController.pagedSearchUsers);
router.patch("/:uuid", UserController.updateUser);
router.delete("/:uuid", UserController.deleteUser);
router.get("/:uuid", UserController.readUser);

module.exports = router;
