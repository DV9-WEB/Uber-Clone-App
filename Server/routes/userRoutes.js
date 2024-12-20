const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js")// Ensure the path is correct

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.userProfile)
router.get("/logout", authMiddleware.authUser, userController.logoutUser)



module.exports = router;
