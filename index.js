require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8008;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", error => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes/routes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
