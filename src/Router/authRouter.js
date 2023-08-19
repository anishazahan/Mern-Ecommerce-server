const express = require("express");

const runValidation = require("../Validators");
const { handleLogin, handleLogout } = require("../Controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth");
const { validateUserLogin } = require("../Validators/auth");

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateUserLogin,
  runValidation,
  isLoggedOut,
  handleLogin
);
authRouter.post("/logout", isLoggedIn, handleLogout);

module.exports = authRouter;
