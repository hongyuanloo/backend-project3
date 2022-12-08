const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getNewAccessToken,
} = require("../controllers/auth-controller");

//APIs
router.post("/signup", signup);
router.post("/login", login);
router.get("/token", getNewAccessToken);
//logout

module.exports = { router };
