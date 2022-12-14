const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
} = require("../controllers/user-controller");

//APIs
router.post("/", createUser);

//TODO authenticateToken for protected APIs
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = { router };
