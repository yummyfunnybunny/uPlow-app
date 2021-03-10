// ANCHOR -- Require Modules --
const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// ANCHOR -- Initialize Router --
const router = express.Router();

// ANCHOR -- User Routes --

// -- Unprotected Routes --
router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect routes from un-logged-in users
router.use(authController.protectRoutes);
router.patch("/updateMyPassword", authController.updatePassword);
// router.get("/Me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

// Restrict the below routes to admins only
router.use(authController.restrictUsers("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// ANCHOR -- Export The User Routers --
module.exports = router;
