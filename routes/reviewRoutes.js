// ANCHOR -- Require Modules --
const express = require("express");
const reviewController = require("../controllers/reviewController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Location Routes --
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

// ANCHOR -- Export Router --
module.exports = router;
