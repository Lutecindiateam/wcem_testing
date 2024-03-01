const express = require("express");
const env = require("dotenv");
const path = require("path");
// const cors = require("cors");
const helmet = require("helmet")
const bodyParser = require("body-parser");

const app = express();
// app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// const express = require("express");
// const app = express();

const mongoose = require("mongoose");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for developement

//for production
// const helmet = require("helmet");
// app.use(helmet());

env.config();

const authRoutes = require("./src/routes/user");

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("error ::", error.message);
  });

app.use("/api", authRoutes);

// app.use(
//   "/public",
//   express.static(path.join(__dirname, "./src/WCEM-2024-2025"))
// );

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log(`server is ready for port ${process.env.PORT}`);
});
