// ANCHOR -- Require Modules --
const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// ANCHOR -- Initialize Router --
const router = express.Router();

// ANCHOR -- User Routes --
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// ANCHOR -- Unprotected Routes --
// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.get("/logout", authController.logout);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// ANCHOR -- Protected Routes --
// router.use(authController.protect);
// router.patch("/updateMyPassword", authController.updatePassword);
// router.get("/Me", userController.getMe, userController.getUser);
// router.patch(
//   "/updateMe",
//   userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
//   userController.updateMe
// );
// router.delete("/deleteMe", userController.deleteMe);

// ANCHOR -- Restrict Routes --
// router.use(authController.restrictTo("admin"));

// router
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

// ANCHOR -- Export The User Routers --
module.exports = router;
