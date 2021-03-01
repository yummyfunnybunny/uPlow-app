// ANCHOR -- Require Modules --
const mongoose = require("mongoose");

// ANCHOR -- Create Tour Schema --
const reviewSchema = new mongoose.Schema(
  {
    // The number rating for the review
    rating: {
      type: Number,
      minLength: [1, "ratings must be between 1 and 5"],
      maxLength: [5, "ratings must be between 1 and 5"],
      default: 4,
    },
    // What did the reviewer have to say about the plow?
    review: {
      type: String,
      maxLength: [300, "Review is too long. Please make it shorter"],
    },
    // What was the location of the plow performed
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
    },
    // Who was the plower for the plow performed
    plower: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must have a plower"],
    },
    // Who was the resident for the plow performed
    resident: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must have a resident"],
    },
    // When was the review created
    timeStamp: {
      type: Date,
      default: Date.now(),
    },
    // Who does the review belong to
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must have an owner"],
    },
  },
  {
    // Schema Options
    toJSON: { virtuals: true }, // this tells the schema to include virtual properties when outputted to JSON
    toObject: { virtuals: true }, // this tells the schema to include virtual properties when outputted to objects
  }
);

// SECTION == Create Indexes ==
// !SECTION

// SECTION == Virtual Properties ==
// !SECTION

// SECTION == Document Middle-Ware ==
// !SECTION

// SECTION == Query Middle-Ware ==
// !SECTION

// SECTION == Aggregation Middle-Ware ==
// !SECTION

// SECTION == Instance Methods ==
// !SECTION

// ANCHOR -- Create Tour Model --
const Review = mongoose.model("Review", reviewSchema);

// ANCHOR -- Export Model --
module.exports = Review;
