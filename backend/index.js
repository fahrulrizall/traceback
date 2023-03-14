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

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://traceback.id"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", VerifyToken, authRoutes);
app.use("/users", VerifyToken, userRoutes);
app.use("/plants", VerifyToken, plantRoutes);
app.use("/vendors", VerifyToken, vendorRoutes);
app.use("/receiving", VerifyToken, receivingRoutes);
app.use("/trimming", VerifyToken, trimmingRoutes);
app.listen(port);
