// ANCHOR -- Require Modules --
const Location = require("../Models/locationModel");
const Plow = require("../Models/plowModel");
const Review = require("../Models/reviewModel");
const Transaction = require("../Models/transactionModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");
const { getWeather, getUnit } = require("../utilities/openWeatherApi");
const { getLocationsWithin } = require("./locationController");
// const { default: axios } = require("axios");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Home Page --
exports.getHome = (req, res, next) => {
  const homePage = true;
  res.status(200).render("home", {
    title: "Home | uPlow",
    homePage: homePage,
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
// ANCHOR -- Guide --
exports.getGuide = (req, res, next) => {
  res.status(200).render("guide", {
    title: "Guide | uPlow",
  });
};
// ANCHOR -- Support --
exports.getSupport = (req, res, next) => {
  res.status(200).render("support", {
    title: "Support | uPlow",
  });
};
// ANCHOR -- Dashboard --
exports.getDashboard = (req, res, next) => {
  const homePage = false;
  const dashboard = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    dashboard: dashboard,
  });
};
// ANCHOR -- Dashboard Messages --
exports.getDashboardMessages = (req, res, next) => {
  const homePage = false;
  const messages = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    messages: messages,
  });
};
// ANCHOR -- Dashboard Alerts --
exports.getDashboardAlerts = (req, res, next) => {
  const homePage = false;
  const alerts = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    alerts: alerts,
  });
};
// ANCHOR -- Dashboard Your Jobs --
exports.getDashboardJobs = (req, res, next) => {
  const homePage = false;
  const jobs = true;
  // TODO get list of jobs from the DB
  // TODO get location of these jobs as well for the map
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    jobs: jobs,
  });
};
// ANCHOR -- Dashboard Routes --
exports.getDashboardRoutes = (req, res, next) => {
  const homePage = false;
  const routes = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    routes: routes,
  });
};
// ANCHOR -- Dashboard Find Work --
exports.getDashboardFind = async (req, res, next) => {
  const homePage = false;
  const find = true;
  const locations = await getLocationsWithin(50, "43.220182, -71.702017", "mi");
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    find: find,
    locations: locations,
  });
};

// ANCHOR -- Dashboard Weather --
exports.getDashboardWeather = (req, res, next) => {
  const homePage = false;
  const weather = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    weather: weather,
  });
};
// ANCHOR -- Dashboard Account --
exports.getDashboardAccount = (req, res, next) => {
  const homePage = false;
  const account = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    account: account,
  });
};
// ANCHOR -- Dashboard Payments --
exports.getDashboardPayments = (req, res, next) => {
  const homePage = false;
  const payments = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    payments: payments,
  });
};
// ANCHOR -- Dashboard Messages --
exports.getDashboardSettings = (req, res, next) => {
  const homePage = false;
  const settings = true;
  res.status(200).render("dashboard", {
    title: "Dashboard | uPlow",
    homePage: homePage,
    settings: settings,
  });
};
// !SECTION
