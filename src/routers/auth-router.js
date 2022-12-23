const express = require("express");
const { login, getNewAccessToken } = require("../controllers/auth-controller");

const router = express.Router();

//APIs
router.post("/login", login);

//protected APIs
router.get("/token", getNewAccessToken);

module.exports = { router };
