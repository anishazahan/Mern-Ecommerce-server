const express = require("express");

const runValidation = require("../Validators");
const { handleLogin, handleLogout } = require("../Controller/authController");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);

module.exports = authRouter;
