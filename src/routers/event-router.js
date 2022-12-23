const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
} = require("../controllers/event-controller");
const {
  removeEventfromUsersSavedEvent,
} = require("../middlewares/event-middleware");
const { authenticateToken } = require("../middlewares/auth-middleware");

const router = express.Router();

//APIs
router.get("/", getAllEvents);
router.get("/:id", getEventById);

//protected APIs
router.post("/", authenticateToken, createEvent);
router.put("/:id", authenticateToken, updateEventById);
router.delete(
  "/:id",
  authenticateToken,
  removeEventfromUsersSavedEvent,
  deleteEventById
);

module.exports = { router };
