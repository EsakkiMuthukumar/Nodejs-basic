const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT;
const url = process.env.MONGO_URL;

mongoose.connect(url);
const mongo = mongoose.connection;

mongo.once("connected", () => {
  console.log("Connected...");
});

app.use(express.json());

const student = require("./routers/student");
app.use("/student", student);

app.listen(port, () => {
  console.log(`Application successfully listen ${port} portal`);
});
