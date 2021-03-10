// ANCHOR -- Require Modules --
const Location = require("../Models/locationModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Locations --
module.exports.getAllLocations = catchAsync(async (req, res, next) => {
  // 1) Get all locations in DB
  const locations = await Location.find();
  // 2) show error message if no location was found
  if (!locations) console.log("No locations were found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully retrieved all locations",
    results: locations.length,
    data: locations,
  });
});

// ANCHOR -- Create Location --
module.exports.createLocation = catchAsync(async (req, res, next) => {
  // 1) Create new location in DB
  const location = await Location.create(req.body);
  // 2) show error message if no location was found
  if (!location) console.log("no location was created.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created location",
    data: location,
  });
});

// ANCHOR -- Get Location --
module.exports.getLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB
  const location = await Location.findById(req.params.id);
  // 2) show error message if no location was found
  if (!location) console.log("No location was found for that ID");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created location",
    data: location,
  });
});

// ANCHOR -- Update Location --
module.exports.updateLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB and update
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // 2) show error message if no location was found
  if (!location) console.log("No location by that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully updated location",
    data: location,
  });
});

// ANCHOR -- Delete Location --
module.exports.deleteLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB and delete
  const location = await Location.findByIdAndRemove(req.params.id);
  // 2) show error message if no location was found
  if (!location) console.alert("no location with that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully deleted location",
    data: location,
  });
});
// !SECTION
