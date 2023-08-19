const createHttpError = require("http-errors");
const userModel = require("../Model/user.model");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { successResponse } = require("./responseController");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtAccessKey } = require("../secret");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw createError(
        404,
        "User doesn't exist with this email, Please Register!"
      );
    }
    if (user.isBanned) {
      throw createError(403, "You are banned, Please contact the authorities.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare with user.password

    if (!isPasswordMatch) {
      throw createError(401, "Email/Password does not match.");
    }

    // .... create token......
    const accessToken = createJsonWebToken({ user }, jwtAccessKeyKey, "20m");
    res.cookie("accessToken", accessToken, {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: none,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie(accessToken);
    return successResponse(res, {
      statusCode: 200,
      message: "User logout successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
};
