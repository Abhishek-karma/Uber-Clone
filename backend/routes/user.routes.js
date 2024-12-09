const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require('../middlerwares/auth.middleware')
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 8 }) .withMessage("Password must be at least 8 characters long"), 
  ],
  userController.loginUser
);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

router.get('/logout',authMiddleware.authUser ,userController.logOut)

module.exports = router;
