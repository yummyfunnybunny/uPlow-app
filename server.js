// ANCHOR -- Require Modules --
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// ANCHOR -- Initialize Config --
dotenv.config({
  path: "./config.env",
});

// Log Environment
console.log(`🏞  current environment: ${app.get("env")} 🏞`);

// ANCHOR -- Connect MONGODB --
// 1) Declare the MongoDB Atlas cluster
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// 2) connect to the mongoDB database we declared above
mongoose
  .connect(DB, {
    // these are just to handle deprecation warnings, so copy/paste this in other projects with mongooese
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// ANCHOR -- Listen To Server --
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to server on port ${port}`);
});
