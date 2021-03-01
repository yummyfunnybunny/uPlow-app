// ANCHOR -- Require Modules --
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// ANCHOR -- Create Tour Schema --
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User must have an Email"],
      unique: true,
      lowercase: true, // automatically converts to lowercase
      validate: [validator.isEmail, "User must provide a valid Email"],
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["plower", "resident", "admin"],
      default: "resident",
    },
    password: {
      type: String,
      required: [true, "User must create a valid password"],
      minlength: 8,
      select: false, // stops this field from being projected to the client
    },
    passwordConfirm: {
      type: String,
      required: [true, "User must confirm password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
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
const User = mongoose.model("User", userSchema);

// ANCHOR -- Export Model --
module.exports = User;
