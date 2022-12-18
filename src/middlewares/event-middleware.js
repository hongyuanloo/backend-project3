const httpStatus = require("http-status");
const { userModel } = require("../models");

async function removeEventfromUsersSavedEvent(req, res, next) {
  /* removeEventfromUsersSavedEvent:
  1. remove specified eventId that is used in savedEvents from userModel
  */
  const id = req.params.id;
  try {
    const result = await userModel
      .updateMany({ savedEvents: id }, { $pull: { savedEvents: id } })
      .exec();
    //   {
    //   acknowledged: true,
    //   modifiedCount: 1,
    //   upsertedId: null,
    //   upsertedCount: 0,
    //   matchedCount: 1
    // }
    next();
  } catch (e) {
    console.error(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
}

module.exports = { removeEventfromUsersSavedEvent };
