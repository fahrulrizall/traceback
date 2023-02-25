import bodyParser from "body-parser";
import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/authentication.js";
import plantRoutes from "./routes/plants.js";
import vendorRoutes from "./routes/vendors.js";
import middlewareLogReq from "./middleware/logs.js";
import VerifyToken from "./middleware/verifyToken.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // accept json
app.use(middlewareLogReq); // cek log
app.use(cookieParser());
app.use(express.json()); // agar bisa terima format json

app.use("/auth", authRoutes);
app.use("/users", VerifyToken, userRoutes);
app.use("/plants", VerifyToken, plantRoutes);
app.use("/vendors", VerifyToken, vendorRoutes);
app.listen(port);
