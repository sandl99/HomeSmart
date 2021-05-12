var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compress = require("compression");
var cors = require("cors");
var helmet = require("helmet");
var config = require("./config/config");
var mongoose = require("mongoose");

const deviceRouter = require("./routes/device.routes")
const authRouter = require("./routes/auth.routes")
const sensorRouter = require("./routes/sensor.routes")
// const sensordataRouter = require("./routes/sensordata.routes")

const mongoUrl = config.config.mongoUri;

mongoose.connect(
  mongoUrl,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to IoTDB: " + mongoUrl);
  }
);

var app = express();  

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/device", deviceRouter);
app.use("/api/v1/sensor", sensorRouter);
// app.use("/api/v1/sensordata", sensordataRouter);
 
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ error: err.name + ": " + err.message });
    }
  });
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  
  module.exports = app;
  