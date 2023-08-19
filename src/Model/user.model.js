const { defaultImgPath } = require("../secret");
const bcrypt = require("bcryptjs");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [31, "The length of user name can be  31 characters"],
      minlength: [3, "The length of user name must be minimum 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Please enter in a valid email",
      },
    },
    image: {
      type: String,
      default: defaultImgPath,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [3, "The length of Address can be minimum 3 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      minlength: [6, " length the password must be minimum 6 characters"],
      set: function (v) {
        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const userModel = model("users", userSchema);

module.exports = userModel;
