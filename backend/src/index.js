import bodyParser from "body-parser";
import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/authentication.js";
import middlewareLogReq from "./middleware/logs.js";
import VerifyToken from "./middleware/verifyToken.js";
// import routes from "./routes";
import { refreshToken } from "./controller/refreshToken.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json()); // accept json
app.use(middlewareLogReq); // cek log
app.use(cookieParser());
app.use(express.json()); // agar bisa terima format json

// app.use(routes);

app.use("/users", VerifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/token", refreshToken);
app.listen(port);
