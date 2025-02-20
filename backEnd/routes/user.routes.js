const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  getUserProfile,
} = require("../controllers/user.controller");
const { body } = require("express-validator");
const verifyJwtToken = require("../middleware/verifyJwtToken");

router.post(
  "/register",
  [
    body("userName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginUser
);

router.get("/logout", verifyJwtToken, logOut);
router.get("/profile", verifyJwtToken, getUserProfile);

module.exports = router;
