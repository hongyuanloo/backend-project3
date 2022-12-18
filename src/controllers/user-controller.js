const { userModel } = require("../models");
const httpStatus = require("http-status");
const { hashPassword } = require("../services/auth-service");

async function getAllUsers(req, res) {
  try {
    const result = await userModel.find(req.query).exec();
    res.status(httpStatus.OK).json(result);
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

async function createUser(req, res) {
  //create new User obj.
  const userInfor = { ...req.body };
  //hash password.
  console.log("userInfor: ", userInfor);
  try {
    userInfor.password = await hashPassword(req.body.password);
  } catch (e) {
    console.log("hashPassword error: ", e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }

  //store newUser to db.
  const newUser = new userModel(userInfor);
  newUser.save((err) => {
    if (err) {
      switch (err.code) {
        case 11000: //"name" or "email" already exist.
          const key = Object.keys(err.keyValue)[0];
          const errMessage = `'${err.keyValue[key]}' already exist. Select another ${key}.`;
          return res.status(httpStatus.CONFLICT).send(errMessage);

        default:
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    res.sendStatus(httpStatus.CREATED);
  });
}

async function getUserById(req, res) {
  // console.log("getEventById: ", req.params.id);
  try {
    const result = await userModel.findById(req.params.id).exec();
    res.status(httpStatus.OK).json(result); //200
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

async function updateUserById(req, res) {
  try {
    const result = await userModel.updateOne({ _id: req.params.id }, req.body);
    res.status(httpStatus.OK).json(result); //200
    //   {
    //     "acknowledged": true,
    //     "modifiedCount": 1,
    //     "upsertedId": null,
    //     "upsertedCount": 0,
    //     "matchedCount": 1
    // }
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

async function deleteUserById(req, res) {
  try {
    const result = await userModel.deleteOne({ _id: req.params.id });
    res.status(httpStatus.OK).json(result);
    //   {
    //     "acknowledged": true,
    //     "deletedCount": 1
    // }
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
