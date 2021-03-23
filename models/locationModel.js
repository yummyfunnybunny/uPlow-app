// ANCHOR -- Require Modules --
const mongoose = require("mongoose");
const User = require("./userModel");

// ANCHOR -- Create Tour Schema --
const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A location must have a name"],
      trim: true,
      maxLength: [50, "Location name is too long"],
      minLength: [1, "Location is too short"],
    },
    coverImage: {
      type: String,
      // required: [true, "A location must have a cover image"],
    },
    images: [String],
    type: {
      type: String,
      required: [true, "A location must have a type selected"],
      enum: ["driveway", "parking lot"],
      default: "driveway",
    },
    size: {
      type: String,
      required: [true, "A location must have a designated size"],
      enum: {
        values: ["small", "medium", "large"],
        message: "Size can only be: small, medium, large",
      },
      default: "small",
    },
    location: {
      // required: [true, "A location must have proper location information"],
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
      address: String,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "unavailable",
    },
    plowInstructions: [
      {
        type: String,
        minLength: [1, "Instructions are too short"],
        maxLength: [100, "Instructions are too long"],
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be 1 or greater"],
      max: [5, "Rating must be 5 or less"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    // Schema Options
    toJSON: { virtuals: true }, // this tells the schema to include virtual properties when outputted to JSON
    toObject: { virtuals: true }, // this tells the schema to include virtual properties when outputted to objects
  }
);

// SECTION == Create Indexes ==

locationSchema.index({ location: "2dsphere" }); // geospatial data needs to be defined as either '2dsphere' or '2d'

// !SECTION

// SECTION == Virtual Properties ==
// !SECTION

// SECTION == Virtual Populate ==

locationSchema.virtual("owner", {
  ref: "User",
  foreignField: "ownedLocations",
  localField: "_id",
});

// !SECTION

// SECTION == Document Middle-Ware ==

locationSchema.pre("save", async function (next) {
  const ownerPromise = this.owner.map(async (id) => await User.findById(id));
  console.log(ownerPromise);
  this.owner = await Promise.all(ownerPromise);
  next();
});

// !SECTION

// SECTION == Query Middle-Ware ==

// ANCHOR -- Filter Out Unavailable Locations --
// available locations are ones that currently need work and do not have a dedicated plower
locationSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: "unavailable" } });
  next();
});
// !SECTION

// SECTION == Aggregation Middle-Ware ==
// !SECTION

// SECTION == Static Methods ==
// !SECTION

// SECTION == Instance Methods ==
// !SECTION

// ANCHOR -- Create Tour Model --
const Location = mongoose.model("Location", locationSchema);

// ANCHOR -- Export Model --
module.exports = Location;
