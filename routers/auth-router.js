const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth-controller");

//APIs
router.post("/signup", signup);

module.exports = { router };
