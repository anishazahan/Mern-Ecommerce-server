const { body } = require("express-validator");

// register validator

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("The length of user name can be  3-31 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required.")
    .isLength({ min: 6 })
    .withMessage("The length of password must be  6 characters"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is Required.")
    .isLength({ min: 3 })
    .withMessage("The length of Address can be minimum 3 characters"),
  body("phone").trim().notEmpty().withMessage("Phone is Required."),
  body("image").optional().isString().withMessage("Image is Required"),
];
module.exports = {
  validateUserRegistration,
};
