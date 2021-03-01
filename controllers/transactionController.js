// ANCHOR -- Require Modules --
const Transaction = require("../Models/transactionModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==
exports.getTransactions = (req, res, next) => {
  console.log("get transactions...");
  next();
};
// !SECTION
