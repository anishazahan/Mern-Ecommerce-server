const express = require("express");
const {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
  updateUserByID,
} = require("../Controller/userController");
const upload = require("../middleware/upload-flies");
const { validateUserRegistration } = require("../Validators/auth");
const runValidation = require("../Validators");
const { isLoggedIn, isLoggedOut } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),
  isLoggedOut,
  validateUserRegistration,
  runValidation,
  processRegister
);

userRouter.post("/verify", isLoggedOut, activateUserAccount);
userRouter.get("/", isLoggedIn, getUsers);
userRouter.get("/:id", isLoggedIn, getUserByID);
userRouter.put("/:id", upload.single("image"), isLoggedIn, updateUserByID);
userRouter.delete("/:id", isLoggedIn, deleteUserByID);

module.exports = userRouter;
