// ANCHOR -- Require Modules --
const express = require("express");
const weatherController = require("../controllers/weatherController");

// ANCHOR -- Initialize Weather Router --
const router = express.Router();

// ANCHOR -- Weather Routes --
router.route("/").get(weatherController.getWeather);
