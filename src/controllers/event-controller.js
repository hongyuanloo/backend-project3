const { eventModel } = require("../models");
const httpStatus = require("http-status");

async function getAllEvents(req, res) {
  try {
    const result = await eventModel.find(req.query).exec();
    res.status(httpStatus.OK).json(result);
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

function createEvent(req, res) {
  const newEvent = new eventModel(req.body);
  newEvent.save((err) => {
    if (err) {
      switch (err.code) {
        case 11000: //"title" already exist.
          const key = Object.keys(err.keyValue)[0];
          const errMessage = `'${err.keyValue[key]}' already exist. Select another ${key}.`;
          return res.status(httpStatus.CONFLICT).send(errMessage);

        default:
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    res.status(httpStatus.CREATED).json(newEvent);
  });
}

async function getEventById(req, res) {
  try {
    const result = await eventModel.findById(req.params.id).exec();
    res.status(httpStatus.OK).json(result);
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

async function updateEventById(req, res) {
  try {
    const result = await eventModel.updateOne({ _id: req.params.id }, req.body);
    res.status(httpStatus.OK).json(result);
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

async function deleteEventById(req, res) {
  try {
    const result = await eventModel.deleteOne({ _id: req.params.id });
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
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
};
