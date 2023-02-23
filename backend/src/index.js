require("dotenv").config();
const bodyParser = require("body-parser");

const port = process.env.PORT;

const express = require("express");
const usersRoutes = require("./routes/users");
const middlewareLogReq = require("./middleware/logs");

const app = express();

app.use(bodyParser.json()); // accept json

app.use(middlewareLogReq);
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(port);
