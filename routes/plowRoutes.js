// ANCHOR -- Require Modules --
const express = require("express");
const plowController = require("../controllers/plowController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Plow Routes --
router.get("/", plowController.getPlows);

// ANCHOR -- Export Router --
module.exports = router;
