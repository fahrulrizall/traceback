require("dotenv").config();

const port = process.env.PORT;

const express = require("express");
const usersRoutes = require("./routes/users");
const middlewareLogReq = require("./middleware/logs");

const app = express();

app.use(middlewareLogReq);
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`server berhasil running ${port}`);
});
