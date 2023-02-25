import express from "express";
import AuthController from "../controller/authentication.js";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);

export default authRoutes;
