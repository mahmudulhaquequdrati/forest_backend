const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
// const path = require("path");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");
const errorHandler = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const app = express();

const forestRoute = require("./src/routes/forestRoute");

// User Middlewares
app.use(cors());
app.use(express.json());
connectDB();
colors.enable();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "<h2 style='color:green;box-sizing:border-box; margin:0; background: #f3f3f9; height: 95vh;'>Server is Running!<h2>"
  );
});
// --------------------
// ---------------
// ----------
// -----
// Routes
app.use("/api", forestRoute);
app.use("/uploads", express.static("uploads"));
// -----
// ----------
// ---------------
// --------------------
// Not Found Or 404 error Page

// Handle Error
app.use(errorHandler);
// -----
// ----------
// ---------------
// -------------------

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    colors.green.underline(`📗Connected`),
    colors.yellow.underline("to Server!")
  );
  app.listen(PORT, () => console.log(`Server running in port no : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(colors.red("📕", err));
});
