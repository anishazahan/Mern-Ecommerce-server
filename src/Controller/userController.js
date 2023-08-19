const createError = require("http-errors");
const userModel = require("../Model/user.model");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findById } = require("../services/user-services/findById");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtActivationKey, clientUrl } = require("../secret");
const sendEmailWithNodemailer = require("../helper/email");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    // searching filter for user
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };

    const users = await userModel
      .find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await userModel.find(filter).countDocuments();

    if (!users) throw createError(404, "No Users Found");

    // res.status(200).send({
    //   message:"users get successfully",
    //   users,
    //   pagination:{
    //     totalPages : Math.ceil(count / limit),
    //     currentPage:page,
    //     previousPage: page - 1 > 0 ? page - 1 : null,
    //     nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,

    //   }
    // })

    return successResponse(res, {
      statusCode: 200,
      message: "Users get successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next();
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const findUser = await findById(userModel, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "Items get successfully By Id",
      payload: { findUser },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

const deleteUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const findUser = await findById(userModel, id, options);

    const userImagePath = findUser.image;

    deleteImage(userImagePath);

    await userModel.findByIdAndDelete({ _id: id, isAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "Items deleted successfully By Id",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // console.log(name, email);
    const image = req.file;
    // console.log(image);
    if (!image) {
      throw createError(404, "Image file is required");
    }
    if (image.size > 1024 * 1024 * 2) {
      throw createError(
        404,
        "Image file is too large,it must be less than 2 MB"
      );
    }
    const imgBufferString = image.buffer.toString("base64");

    const userExists = await userModel.exists({ email: email });

    if (userExists) {
      throw createError(409, "Email already exists, Please Login in!");
    }

    // .... create token......
    const token = createJsonWebToken(
      { name, email, password, phone, address, image: imgBufferString },
      jwtActivationKey,
      "20m"
    );

    // .... prepare email......

    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
          <h2> Hellow ${name} !</h2>
          <P>Please Click here to this link <a target=_blank href='${clientUrl}/api/users/activate/${token}'>activate your account</a> </P>
          
          `,
    };

    // .... send mail with nodemailer......
    try {
      // await sendEmailWithNodemailer(emailData)
    } catch (emailError) {
      next(createError(500, "faield to send verification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration processes`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token; // Add 'const' to token declaration
    if (!token) {
      throw createError(404, "Token Not Found");
    }

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      console.log(decoded);
      if (!decoded) {
        throw createError(401, "User was not able to be verified");
      }

      const userExists = await userModel.exists({ email: decoded.email });

      if (userExists) {
        throw createError(409, "Email already exists, Please Login in!");
      }
      await userModel.create(decoded);

      // Provide the email information in the message
      const email = "user@example.com";
      return successResponse(res, {
        statusCode: 200,
        message: `Please go to your ${email} for completing your registration process`,
        payload: { token },
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid Token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

// --------update user..............

const updateUserByID = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateOptions = { new: true, runValidation: true, context: "query" };
    let updates = {};

    for (let key in req.body) {
      if (["name", "password", "phone", "address"].includes(key)) {
        updates[key] = req.body[key];
      } else if (["email"].includes(key)) {
        throw new Error("Email cannot be update.");
      }
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(
          404,
          "Image file is too large,it must be less than 2 mb"
        );
      }
      updates.image = image.buffer.toString("base64");
    }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    if (!updateUser) {
      throw createError(404, "User with this id does not exists");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully By Id",
      payload: updateUser,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  deleteUserByID,
  processRegister,
  activateUserAccount,
  updateUserByID,
};
