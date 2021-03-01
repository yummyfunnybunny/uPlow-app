// ANCHOR -- Require Modules --
const express = require("express");
const transactionController = require("../controllers/transactionController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Location Routes --
router.get("/", transactionController.getTransactions);

// ANCHOR -- Export Router --
module.exports = router;
