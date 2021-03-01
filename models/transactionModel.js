// ANCHOR -- Require Modules --
const mongoose = require("mongoose");

// ANCHOR -- Create Tour Schema --
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      price: [true, "A transaction must have an amount"],
    },
    resident: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A transaction must have a resident"],
    },
    plower: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A transaction must have a plower"],
    },
    timeStamp: {
      type: Date,
      default: Date.now(),
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
const Transaction = mongoose.model("Transaction", transactionSchema);

// ANCHOR -- Export Model --
module.exports = Transaction;
