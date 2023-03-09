const express = require("express");
const AuthController = require("../controller/authentication.js");

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.delete("/logout", AuthController.logout);
authRoutes.get("/token", AuthController.refreshToken);

module.exports = authRoutes;
