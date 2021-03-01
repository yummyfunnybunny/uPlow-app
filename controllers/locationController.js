// ANCHOR -- Require Modules --
const Location = require("../Models/locationModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==
exports.getLocations = (req, res, next) => {
  console.log("get users...");
  next();
};
// !SECTION
