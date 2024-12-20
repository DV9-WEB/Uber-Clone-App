const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/userRoutes.js")
const cookie = require("cookie-parser")
const captainRoutes = require("./routes/captainRoutes.js")
  
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);

module.exports = app;
