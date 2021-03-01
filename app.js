// ANCHOR -- Require Modules --
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const locationRouter = require("./routes/locationRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const plowRouter = require("./routes/plowRoutes");
const viewRouter = require("./routes/viewRoutes");

// ANCHOR -- Initialize Express
const app = express();

// ANCHOR -- Initialize Template Engine --
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

// SECTION == Global Middle-Ware ==

// ANCHOR -- Initialize Morgan --
//check the environment mode before running morgan
// development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ANCHOR -- Initialize Parsers --
app.use(express.json({ limit: "10kb" })); // sets the limit of the body to 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // this allows us to parse data coming from a url-encoded HTML form

// !SECTION

// ANCHOR -- Mounted Routes --
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/locations", locationRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/plows", plowRouter);

// ANCHOR -- Export --
module.exports = app;
