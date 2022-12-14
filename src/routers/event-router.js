const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
} = require("../controllers/event-controller");

//APIs
router.get("/", getAllEvents);
router.get("/:id", getEventById);

//TODO authenticateToken for protected APIs
router.post("/", createEvent);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);

module.exports = { router };
