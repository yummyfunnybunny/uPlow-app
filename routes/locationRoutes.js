// ANCHOR -- Require Modules --
const express = require("express");
const locationController = require("../controllers/locationController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Location Routes --
router.get("/", locationController.getLocations);

// ANCHOR -- Export Router --
module.exports = router;
