import express from "express";
import AuthController from "../controller/authentication.js";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.delete("/logout", AuthController.logout);
authRoutes.get("/token", AuthController.refreshToken);

export default authRoutes;
