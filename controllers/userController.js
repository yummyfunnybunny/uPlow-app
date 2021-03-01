// ANCHOR -- Require Modules --
const User = require("../Models/userModel");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Users --
module.exports.getAllUsers = async (req, res, next) => {
  // 1) get all users in DB
  const users = await User.find();
  // 2) show error message if no users was found
  if (!users) {
    console.log("no users were found");
  }
  // 3) send successful response
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
};

// ANCHOR -- Create User --
module.exports.createUser = async (req, res, next) => {
  // 1) create new user in DB
  const user = await User.create(req.body);
  // 2) show error message if no user was found
  if (!user) {
    console.log("no user with that id was found");
  }
  // 3) send successful response
  res.status(200).json({
    status: "new user successfully created!",
    data: user,
  });
};

// ANCHOR -- Get User --
module.exports.getUser = async (req, res, next) => {
  // 1) search DB for user
  const user = await User.findById(req.params.id);
  // 2) show error message if no user was found
  if (!user) {
    console.log("no user with that id was found");
  }

  // 3) send successful response
  res.status(200).json({
    status: "successfully found user!",
    data: user,
  });
};

// ANCHOR -- Update User --
module.exports.updateUser = async (req, res, next) => {
  // 1) search DB for user and update
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // 2) show error message if no user was found
  if (!user) {
    console.log("no user with that id was found");
  }
  // 3) send successful response
  res.status(200).json({
    status: "successfully updated user!",
    data: user,
  });
};

// ANCHOR -- Delete User --
module.exports.deleteUser = async (req, res, next) => {
  // 1) search DB for user and delete
  const user = await User.findByIdAndDelete(req.params.id, req.body);

  // 2) show error message if no user was found
  if (!user) {
    console.log("no user with that id was found");
  }

  // 3) send successful response
  res.status(200).json({
    status: "successfully deleted user!",
    data: user,
  });
};

// !SECTION
