const express = require("express");

const runValidation = require("../Validators");
const { handleLogin, handleLogout } = require("../Controller/authController");

const authRouter = express.Router();

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

module.exports = authRouter;
