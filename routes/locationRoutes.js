// ANCHOR -- Require Modules --
const express = require("express");
const locationController = require("../controllers/locationController");

// ANCHOR -- Initialize View Router --
const router = express.Router();

// ANCHOR -- Location Routes --
router
  .route("/locations-within/:distance/center/:latlng/unit/:unit")
  .get(locationController.getLocationsWithin);

router
  .route("/")
  .get(locationController.getAllLocations)
  .post(locationController.createLocation);

router
  .route("/:id")
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

// ANCHOR -- Export Router --
module.exports = router;
