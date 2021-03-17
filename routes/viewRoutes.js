// ANCHOR -- Require Modules --
const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const openWeatherApi = require("../utilities/openWeatherApi");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- use alerts --
// router.use(viewsController.alerts);

// ANCHOR -- View Routes --
router.get("/", authController.isLoggedIn, viewsController.getHome);
router.get("/login", viewsController.getLogin);
router.get("/signup", viewsController.getSignup);
router.get("/guide", viewsController.getGuide);
router.get("/support", viewsController.getSupport);

// Dashboard
router.use(authController.isLoggedIn);
router.get("/dashboard", viewsController.getDashboard);
router.get("/dashboard-messages", viewsController.getDashboardMessages);
router.get("/dashboard-alerts", viewsController.getDashboardAlerts);
router.get("/dashboard-jobs", viewsController.getDashboardJobs);
router.get("/dashboard-routes", viewsController.getDashboardRoutes);
router.get("/dashboard-find", viewsController.getDashboardFind);
router.get("/dashboard-weather", viewsController.getDashboardWeather);
router.get("/dashboard-account", viewsController.getDashboardAccount);
router.get("/dashboard-payments", viewsController.getDashboardPayments);
router.get("/dashboard-settings", viewsController.getDashboardSettings);

// ANCHOR -- Export Router --
module.exports = router;
