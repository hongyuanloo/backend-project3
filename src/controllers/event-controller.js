const { eventModel } = require("../models");
const httpStatus = require("http-status");

async function getAllEvents(req, res) {
  try {
    const result = await eventModel.find(req.query).exec();
    res.status(httpStatus.OK).json(result); //200
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

function createEvent(req, res) {
  //create new Event obj.
  const eventInfor = { ...req.body };

  // console.log("createEvent: ", eventInfor);
  const newEvent = new eventModel(eventInfor);
  newEvent.save((err) => {
    if (err) {
      // console.log(err);
      switch (err.code) {
        case 11000: //"title" already exist.
          const key = Object.keys(err.keyValue)[0];
          const errMessage = `'${err.keyValue[key]}' already exist. Select another ${key}.`;
          return res.status(httpStatus.CONFLICT).send(errMessage); //409 - CONFLICT

        default:
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    res.sendStatus(httpStatus.CREATED); // 201 - CREATED
  });
}
async function getEventById(req, res) {
  // console.log("getEventById: ", req.params.id);
  try {
    const result = await eventModel.findById(req.params.id).exec();
    res.status(httpStatus.OK).json(result); //200
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateEventById(req, res) {
  //event parameters to be updated.
  const updateInfor = { ...req.body };
  // console.log("updateInfor: ", updateInfor);
  try {
    const result = await eventModel.updateOne({ _id: req.params.id }, req.body);
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
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteEventById(req, res) {
  // console.log("deleteEventById: ", req.params.id);
  try {
    const result = await eventModel.deleteOne({ _id: req.params.id });
    res.status(httpStatus.OK).json(result); //200
    //   {
    //     "acknowledged": true,
    //     "deletedCount": 1
    // }
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
};
