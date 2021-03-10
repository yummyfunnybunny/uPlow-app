// ANCHOR -- Require Modules --
const Review = require("../Models/reviewModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Reviews --
module.exports.getAllReviews = catchAsync(async (req, res, next) => {
  // 1) Get all reviews in DB
  const reviews = await Review.find();
  // 2) show error message if no review was found
  if (!reviews) console.alert("Could not find any reviews.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully found all reviews",
    results: reviews.length,
    data: reviews,
  });
});

// ANCHOR -- Create Review --
module.exports.createReview = catchAsync(async (req, res, next) => {
  // 1) Create review in DB
  const review = await Review.create(req.body);
  // 2) show error message if no review was found
  if (!review) console.alert("Could not create review.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully created review",
    data: review,
  });
});

// ANCHOR -- Get Review By ID --
module.exports.getReview = catchAsync(async (req, res, next) => {
  // 1) Find review in DB
  const review = await Review.findById(req.params.id);
  // 2) show error message if no review was found
  if (!review) console.alert("Could not review by that ID.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully found review",
    data: review,
  });
});

// ANCHOR -- Update Review --
module.exports.updateReview = catchAsync(async (req, res, next) => {
  // 1) Find review in DB and update it
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // 2) show error message if no review was found
  if (!review) console.alert("Could not update review.");
  // 3) send successful response
  res.status(200).json({
    status: "successfully updated review",
    data: review,
  });
});

// ANCHOR -- Delete Review --
module.exports.deleteReview = catchAsync(async (req, res, next) => {
  // 1) find review in DB and delete
  const review = await Review.findByIdAndRemove(req.params.id);
  // 2) show error message if no review was found
  if (!review) console.alert("No review with that ID was found");
  // 3) send successful response
  res.status(200).json({
    status: "successfully deleted review",
    data: review,
  });
});
// !SECTION
