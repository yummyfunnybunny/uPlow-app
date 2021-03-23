// ANCHOR -- Require Modules --
const User = require("../Models/userModel");
const { promisify } = require("util"); // built-in node module
const Email = require("../Utilities/email");
const jwt = require("jsonwebtoken");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");
const crypto = require("crypto");

// ANCHOR -- Signup User --
module.exports.signupUser = async (req, res, next) => {
  // 1) save the newUser to the User model
  console.log("signupUser running...");
  const newUser = await User.create(req.body);

  // 2) create url and send welcome email to new user
  // const url = `${req.protocol}://${req.get("host")}/me`;
  // await new Email(newUser, url).sendWelcome(); NOTE come back to this!

  // 3) create, sign, and send token to new user
  createSendToken(newUser, 201, req, res);
};

// ANCHOR -- Login User --
module.exports.loginUser = async (req, res, next) => {
  // 1) get all needed info from the body
  const { email, password } = req.body;
  // 2) check if email and password exist
  if (!email || !password) {
    // console.log("❌ Login user failed: email or password does not exist ❌");
    return next(new AppError("Please provide email and password!", 400));
  }
  // 3) Check if user exists via email and if password matches
  const user = await User.findOne({ email: email }).select("password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    // console.log(
    //   "❌ Login failed: user does not exist or password was incorrect ❌"
    // );
    return next(new AppError("Incorrect Email or Password", 401));
  }
  // 4) send token to client
  createSendToken(user, 200, req, res);
};

// ANCHOR -- Logout User --
module.exports.logoutUser = (req, res) => {
  console.log("logoutUser 1");
  // 1) send cookie labelled 'loggedout' to client that will expire immediately
  res.cookie("jwt", "loggedout", {
    // expires: new Date(Date.now()),
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  console.log("logoutUser 2");
  // 2) send success response
  res.status(200).json({
    status: "successfully logged out",
  });
};

// ANCHOR -- Protect Routes --
module.exports.protectRoutes = async (req, res, next) => {
  // NOTE you should map out the req and res objects, and learn more about headers
  // 1) check if jwt exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // Check for a jwt in the cookies
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    console.log(
      "💥 Access Denied: You do not have permission to visit this page 💥"
    );
  }
  // 2) Verification token
  // NOTE what does promisify do?
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const user = await User.findById(decoded._id);
  if (!user) {
    console.log("💥 Access Denied: This user does not exist 💥");
  }

  // 4) check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    console.log(
      "💥 Access Denied: Password has changed since token was issued💥"
    );
  }
  // 5) Grant access to protected routes
  // NOTE idk what any of this does or means for us...
  req.user = user;
  res.locals.user = user;
  next();
};

// ANCHOR -- Check If Logged In --
module.exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) check if user still exists
      const user = await User.findById(decoded._id);
      if (!user) {
        console.log("no user!");
        return next();
      }
      // 3) check if user changed password after the token was issued
      if (user.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // 4.A) there is a logged in user
      res.locals.user = user; // this is what gives access to 'user' in the pug templates
      res.user = user; // this is how to pass the info through the back end
      return next();
    } catch (err) {
      return next();
    }
  }
  // 4.B) There is no logged in user
  next();
};

// ANCHOR -- Restrict Access --
module.exports.restrictUsers = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("💥 Access Denied: You are not an admin 💥", 403)
      );
    }
    next();
  };
};

// ANCHOR -- Forgot Password --
module.exports.forgotPassword = async (req, res, next) => {
  // 1) get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("💥 No user with that email exists 💥");
  }
  // 2) generate a random reset token and save it to the current user
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) send Email with token to users email
  try {
    // A) create url
    // req.get('host') = '127.0.0.1:3000' or 'localhost:3000'
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    // attempt to send password reset email
    // await new Email(user, url).sendPasswordReset(); NOTE come back to this!

    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (err) {
    // setting the two below model fields to undefined will prevent them from being saved to the
    // database. we don't need them anymore.
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // save updated info to the document, turning off validation checks
    await user.save({ validateBeforeSave: false });
    // send error message and statusCode
    console.log(
      "💥 Something went wrong while trying to send reset token email to user 💥"
    );
  }
};

// ANCHOR -- Reset Password --
module.exports.resetPassword = async (req, res, next) => {
  // 1) get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // find the user with the matching hashedToken
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    console.log("❌ No user was found ❌");
  }
  // 3) update the user password info
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); // we don't turn off validation here, because we WANT to validate the new password

  // 4) log the user in, send JWT to client
  createSendToken(user, 200, req, res);
};

// ANCHOR -- Update Password--
module.exports.updatePassword = async (req, res, next) => {
  // 1) get the user from collection
  // NOTE need to know what '+password' means
  const user = await User.findOne(req.user._id).select("+password");
  // 2) check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    // console.log("💥 passwords do not match 💥");
    new AppError("Incorrect Current Password", 401); // 401 = unauthorized
  }
  // 3) update the password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();
  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
};

// ANCHOR -- Create & Send Token --
const createSendToken = (user, statusCode, req, res) => {
  // 1) create a signed token using jasonwebtoken
  const token = signToken(user._id);
  // 2) Define the jwt cookie
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure: true, // this means the cookie will only be sent via encrypted connection (https)
    httpOnly: true, // this means the cookie cannot be accessed or modifed in anyway by the browser (precents cross-side-scripting attacks)
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  // 3) set password to undefined so it does not show up in the response to the client
  user.password = undefined;
  // 4) send success response
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};

// ANCHOR -- Sign Token --
const signToken = (id) => {
  // NOTE no clue how jwt works...
  return jwt.sign(
    {
      _id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
