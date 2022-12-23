const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user-controller");
const { authenticateToken } = require("../middlewares/auth-middleware");

const router = express.Router();

//APIs
router.post("/", createUser);

//protected APIs
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUserById);
router.delete("/:id", authenticateToken, deleteUserById);

module.exports = { router };
