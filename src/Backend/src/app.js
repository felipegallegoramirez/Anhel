const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
// const corsOptions = {origin: "http://localhost:4200"}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use('/public/images', express.static(path.resolve('public/images')));
app.use("/api/", require("./routes/routes"));

module.exports = app;