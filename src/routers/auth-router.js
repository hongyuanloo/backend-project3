const express = require("express");
const router = express.Router();
const {
  login,
  getNewAccessToken,
  logout,
} = require("../controllers/auth-controller");

//APIs
// router.post("/signup", signup);
router.post("/login", login);

//TODO authenticateToken for protected APIs
router.get("/token", getNewAccessToken);

module.exports = { router };
