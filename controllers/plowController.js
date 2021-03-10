// ANCHOR -- Require Modules --
const Plow = require("../Models/plowModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Plows --
module.exports.getAllPlows = catchAsync(async (req, res, next) => {
  // 1) Get all plows in DB
  const plows = await Plow.find();
  // 2) show error message if no location was found
  if (!plows) console.log("No plows were found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully retrieved all plows",
    results: plows.length,
    data: plows,
  });
});

// ANCHOR -- Create Plow --
module.exports.createPlow = catchAsync(async (req, res, next) => {
  // 1) Create new plow in DB
  const plow = await Plow.create(req.body);
  // 2) show error message if no plow was found
  if (!plow) console.log("no plow was created.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created plow",
    data: plow,
  });
});

// ANCHOR -- Get Plow --
module.exports.getPlow = catchAsync(async (req, res, next) => {
  // 1) Find plow in DB
  const plow = await Plow.findById(req.params.id);
  // 2) show error message if no plow was found
  if (!plow) console.log("No plow was found for that ID");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created plow",
    data: plow,
  });
});

// ANCHOR -- Update Plow --
module.exports.updatePlow = catchAsync(async (req, res, next) => {
  // 1) Find plow in DB and update
  const plow = await Plow.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // 2) show error message if no location was found
  if (!plow) console.log("No plow by that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully updated plow",
    data: plow,
  });
});

// ANCHOR -- Delete Plow --
module.exports.deletePlow = catchAsync(async (req, res, next) => {
  // 1) Find plow in DB and delete
  const plow = await Plow.findByIdAndRemove(req.params.id);
  // 2) show error message if no plow was found
  if (!plow) console.alert("no plow with that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully deleted plow",
    data: plow,
  });
});
// !SECTION
