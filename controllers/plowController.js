// ANCHOR -- Require Modules --
const User = require("../Models/userModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==
exports.getPlows = (req, res, next) => {
  console.log("get users...");
  next();
};
// !SECTION
