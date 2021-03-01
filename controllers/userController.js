// ANCHOR -- Require Modules --
const User = require("../Models/userModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
};

exports.createUser = async (req, res, next) => {
  const newUser = await User.create(req.body);
  console.log("new user created");

  // Send Response
  res.status(200).json({
    status: "new user successfully created!",
    // results: users.length,
    // data: {
    // data: users,
    // },
  });
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    console.log("no user with that id was found");
  }

  // Send Response
  res.status(200).json({
    status: "successfully found user!",
    data: {
      data: user,
    },
  });
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    console.log("no user with that id was found");
  }

  res.status(200).json({
    status: "successfully updated user!",
    data: {
      data: user,
    },
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id, req.body);

  if (!user) {
    console.log("no user with that id was found");
  }

  res.status(200).json({
    status: "successfully deleted user!",
    data: {
      data: user,
    },
  });
};

// !SECTION
