// ANCHOR -- Require Modules --
const express = require("express");
const transactionController = require("../controllers/transactionController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Location Routes --
router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route("/:id")
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

// ANCHOR -- Export Router --
module.exports = router;
