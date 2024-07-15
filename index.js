const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Routes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Importing Models
const userModel = require("./Models/userModel");

const secretKey = process.env.secretKey;
const mongoUrl = process.env.mongoUrl;
// Connection to MongoDB
const connectToDatabase = async () => {
  try {
    let connection = await mongoose.connect(mongoUrl);
    console.log("Successfully connected to DB");
  } catch (err) {
    console.error(err);
  }
};

connectToDatabase();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// CORS headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", Routes);

app.use("/", authRoutes);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
