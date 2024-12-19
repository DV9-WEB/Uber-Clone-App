const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

function connectToDb() {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDb;
