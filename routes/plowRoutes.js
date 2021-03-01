// ANCHOR -- Require Modules --
const express = require("express");
const plowController = require("../controllers/plowController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Plow Routes --
router
  .route("/")
  .get(plowController.getAllPlows)
  .post(plowController.createPlow);

router
  .route("/:id")
  .get(plowController.getPlow)
  .patch(plowController.updatePlow)
  .delete(plowController.deletePlow);

// ANCHOR -- Export Router --
module.exports = router;
