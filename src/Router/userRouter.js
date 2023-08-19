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

const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),

  validateUserRegistration,
  runValidation,
  processRegister
);

userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.put("/:id", upload.single("image"), updateUserByID);
userRouter.delete("/:id", deleteUserByID);

module.exports = userRouter;
