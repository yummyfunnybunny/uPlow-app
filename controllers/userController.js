// ANCHOR -- Require Modules --
const User = require("../Models/userModel");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// ANCHOR -- Multer Setup --
// 1) Initialize Multer
const multerStorage = multer.memoryStorage();
// 2) Create the Multer Filter
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(
      new AppError("Not an image! Please upload an image file only.", 400),
      false
    );
  }
};
// 3) Initialize multer using the 'multerStorage' object and the 'multerFilter' function that we intitialized above
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// SECTION == Middleware ==

// ANCHOR -- Multer --
module.exports.uploadUserPhoto = upload.single("photo");

module.exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  // continue to the next middleware if there is no photo
  if (!req.file) return next();

  // define the req.file.filename, which we need in the 'updateMe' function
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // when doing image processing right after uploading a file, its always best to not even save the file to the disk,
  // but to save it to memory
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// ANCHOR -- Get Me --
// module.exports.getMe = (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// };

// !SECTION

// SECTION == Functions ==

// ANCHOR -- Filter Request --
const filterObj = (reqBody, ...allowedFields) => {
  //  create empty object that will contain the final filtered fields
  const newObj = {};

  // loop through the reqBody keys...
  Object.keys(reqBody).forEach((el) => {
    // for each key in the reqBody, if they match one of the allowed fields...
    if (allowedFields.includes(el)) {
      // add that field to the newObj
      newObj[el] = reqBody[el];
    }
  });
  // return the newObj that now only contains allowed fields
  return newObj;
};

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

// ANCHOR -- Update Me --
module.exports.updateMe = async (req, res, next) => {
  console.log("running updateMe...");
  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    // console.log("❌ User tried posting password info in updateme ❌");
    return next(new AppError(`Incorrect Inputs. Try again.`, 400));
  }
  // 2) filter out unwated fields that we dont want to update
  const filteredBody = filterObj(req.body, "name", "email", "address", "role");
  // 3) add new image if one exists
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  // 4) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runvalidators: true,
  });

  // 5) send success response
  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
};

// ANCHOR -- Delete Me --
module.exports.deleteMe = async (req, res, next) => {
  // 1) find user in DB and set active to false
  await User.findByIdAndUpdate(req.user.id, { active: false });
  // 2) send success response
  req.status(204).json({
    status: "success",
    data: null,
  });
};

// !SECTION
