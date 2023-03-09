const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authentication.js");
const userRoutes = require("./src/routes/users.js");
const plantRoutes = require("./src/routes/plants.js");
const vendorRoutes = require("./src/routes/vendors.js");
const receivingRoutes = require("./src/routes/receiving.js");
const trimmingRoutes = require("./src/routes/trimming.js");
const VerifyToken = require("./src/middleware/verifyToken.js");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // accept json
app.use(cookieParser());
app.use(express.json()); // agar bisa terima format json

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/plants", plantRoutes);
app.use("/vendors", vendorRoutes);
app.use("/receiving", receivingRoutes);
app.use("/trimming", trimmingRoutes);
app.listen(port);
