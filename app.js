// ANCHOR -- Require Modules --
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AppError = require("./Utilities/appError");
const globalErrorHandler = require("./controllers/errorController");
const helmet = require("helmet");
const userRouter = require("./routes/userRoutes");
const locationRouter = require("./routes/locationRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const plowRouter = require("./routes/plowRoutes");
const viewRouter = require("./routes/viewRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const weatherRouter = require("./routes/weatherRoutes");

// ANCHOR -- Initialize Express
const app = express();

// ANCHOR -- Initialize Template Engine --
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ANCHOR -- serving static files --
app.use(express.static(path.join(__dirname, "public")));

// ANCHOR -- Initialize Helmet --
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "*", "localhost:*", "https:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "*", "https", "data:", "localhost:*", "http"],
      scriptSrc: [
        "*",
        "'self'",
        "https:",
        "http:",
        "blob:",
        "https://use.fontawesome.com/8877301646.js",
        "'unsafe-inline'",
        "https://bundle.js:8828",
        "http://127.0.0.1:3000/js/weatherApi",
        "https://*.mapbox.com",
      ],
      frameSrc: ["'self'", "https://bundle.js:*", "https://*.mapbox.com"],
      objectSrc: ["'none'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "unsafe-eval",
        "https://fonts.googleapis.com/",
        "https://use.fontawesome.com/8877301646.css",
        "https://use.fontawesome.com/releases/v4.7.0/css/font-awesome-css.min.css",
        "https://use.fontawesome.com/releases/v5.15.2/css/all.css",
        "https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css",
      ],
      workerSrc: [
        "'self'",
        "data:",
        "blob:",
        "https://bundle.js:*",
        "https://*.mapbox.com",
      ],
      childSrc: ["'self'", "blob:"],
      imgSrc: [
        "*",
        "'self'",
        "data:",
        "blob:",
        "https://bundle.js:*",
        "https://*.mapbox.com",
      ],
      formAction: ["'self'"],
      connectSrc: [
        "'self'",
        "'unsafe-inline'",
        "data:",
        "blob:",
        "https://api.openweathermap.org/*",
        "https://api.openweathermap.org/data/2.5/weather",
        "https://bundle.js:*",
        "ws://127.0.0.1:*/",
        "https://*.mapbox.com",
      ],
      upgradeInsecureRequests: [],
    },
  })
);

// SECTION == Global Middle-Ware ==

// ANCHOR -- Initialize Morgan --
//check the environment mode before running morgan
// development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ANCHOR -- Initialize Parsers --
app.use(express.raw());
app.use(express.json({ limit: "10kb" })); // sets the limit of the body to 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // this allows us to parse data coming from a url-encoded HTML form
app.use(cookieParser());

// !SECTION

// ANCHOR -- Mounted Routes --
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/plows", plowRouter);
app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/weather", weatherRouter);

// ANCHOR -- Handle Unhandled Routes --
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server 🐟`, 404));
});

// ANCHOR --  Global Error Handler --
app.use(globalErrorHandler);

// ANCHOR -- Export --
module.exports = app;
