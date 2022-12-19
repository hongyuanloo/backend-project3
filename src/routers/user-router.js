const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user-controller");

//APIs
router.post("/", createUser);

//TODO authenticateToken for protected APIs
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = { router };
