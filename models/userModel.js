// ANCHOR -- Require Modules --
const crypto = require("crypto");
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
    status: {
      type: String,
      enum: ["accepting work", "ready", "not ready", "unavailable"],
      default: "ready",
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

// SECTION == Virtual Populate ==
// !SECTION

// SECTION == Document Middle-Ware ==
// !SECTION

// SECTION == Query Middle-Ware ==
// !SECTION

// SECTION == Aggregation Middle-Ware ==
// !SECTION

// SECTION == Static Methods ==
// !SECTION

// SECTION == Instance Methods ==

// ANCHOR -- ChangedPasswordAfter --
// checks if the password was changed after the current jwt was issued
userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    // NOTE I need clarification on parseInt and .getTime()
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // true means that password was changed
    return jwtTimeStamp < changedTimeStamp;
  }
  // false means password was never changed
  return false;
};

// ANCHOR -- Create Password Reset Token --
userSchema.methods.correctPassword = function () {
  // 1) create random token number, 32 characters long, saved as a hexadecimal
  const resetToken = crypto.randomBytes(32).toString("hex");
  // 2) hash the resetToken using 'sha256 encryption algorithm', saved as hexadecimal
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // 3) set expiration of password rest token to 10 minutes (converting from miliseconds)
  // NOTE may want to turn this amount of time into a variable later
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // 4) Return the reset token
  return resetToken;
};

// !SECTION

// ANCHOR -- Create User Model --
const User = mongoose.model("User", userSchema);

// ANCHOR -- Export Model --
module.exports = User;
