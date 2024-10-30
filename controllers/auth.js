const { User} = require("../db/index");
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid")


const register = async (req, res, next) => {
  try {
    const { username, email, password} = req.body;
    console.log(req.body, "req.body");
    if (!username || !email || !password ) {
      return next(new HttpError("Please fill the complete form!", 200));
    } else if (password.length < 8) {
      return next(
        new HttpError(
          "Password Length should be greater than or equal to 8 characters.",
          200
        )
      );
    } else if (!validator.isEmail(email)) {
      return next(new HttpError("Email not valid!", 200));
    }
    const user = await User.findAll({
      where: { email: email },
    });
    console.log(user);

    if (user.length > 0) {
      return next(new HttpError("Email already exist!", 200));
    } else {
      let hashedPassword = await bcrypt.hash(password, 12);
      User.create({
        id: uuidv4(),
        username: username,
        email: email,
        password: hashedPassword,
      })
        .then((resp) => {
          res.status(200).json({
            success: true,
            message: "User Successfully Created!",
            // data: resp,
          });
        })
        .catch((err) => {
          console.log(err, "err");
          return next(new HttpError("User not created Try Again Later!", 200));
        });
    }
  } catch (error) {
    next(new HttpError(`Something Went Wrong Please Try Later. ${error}`, 500));
  }
};
//login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Please fill the complete form!", 200));
    } else if (!validator.isEmail(email)) {
      return next(new HttpError("Email not valid!", 200));
    }

    const user = await User.findOne({ where: { email: email },include: [
      {
        model: UserAddress,
        attributes: ["id", "address","phoneNo"],
      },] });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email },
          "gfg_jwt_secret_key"
        );
        console.log(user,'user')
        res.status(200).json({
          success: true,
          message: "User Login",
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNo:user.phoneNo,
          dob:user.dob,
          addresses:user.User_Addresses,
          imageUrl:user.imageUrl,
          token: token,
        });
      } else {
        return next(new HttpError("Invalid Credentials", 200));
      }
    } else {
      return next(new HttpError("Invalid Credentials", 200));
    }
  } catch (error) {
    next(new HttpError(`${error}`, 500));
  }
};
const getAllUsersRecord = (req, res, next) => {
  User.findAll({ order: [["createdAt", "Desc"]],include: [
    {
      model: UserAddress,
      attributes: ["id", "address","phoneNo"],
    },] }).then((result) => {
    res.status(200).json({
      success: true,
      message: "User list fetch successfully",
      data: result,
    });
  });
};
exports.register = register;
exports.login = login;
exports.getAllUsersRecord = getAllUsersRecord;
