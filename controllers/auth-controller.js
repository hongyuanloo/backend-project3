const { userModel } = require("../models");
const httpStatus = require("http-status");
const { hashPassword } = require("../services/auth-service");

const signup = async (req, res) => {
  //create new User obj.
  const userInfor = { ...req.body };
  //hash password.
  try {
    userInfor.password = await hashPassword(req.body.password);
  } catch (err) {
    console.log("hashPassword error: ", err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

  //store newUser to db.
  const newUser = new userModel(userInfor);
  newUser.save((err) => {
    if (err) {
      const errorObj = { errCode: err.code, errMessage: "" };
      switch (err.code) {
        case 11000: //"name" or "email" already exist.
          const key = Object.keys(err.keyValue)[0];
          errorObj.errMessage = `'${err.keyValue[key]}' already exist. Select another ${key}.`;
          return res.status(httpStatus.CONFLICT).json(errorObj); //409 - CONFLICT

        default:
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    res.sendStatus(httpStatus.CREATED); // 201 - CREATED
  });
};

module.exports = { signup };
