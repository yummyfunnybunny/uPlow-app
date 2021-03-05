// ANCHOR -- Require Modules --
const Location = require("../Models/locationModel");
const Plow = require("../Models/plowModel");
const Review = require("../Models/reviewModel");
const Transaction = require("../Models/transactionModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Home Page --
exports.getHome = (req, res, next) => {
  res.status(200).render("home", {
    title: "Home | uPlow",
  });
};
// ANCHOR -- Login Page --
exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login | uPlow",
  });
};
// ANCHOR -- Signup Page --
exports.getSignup = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Signup | uPlow",
  });
};
// ANCHOR -- Account Dashboard --
exports.getDashboard = (req, res, next) => {
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
  });
};
// !SECTION
