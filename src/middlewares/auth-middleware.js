// const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { verifyJWTAccessToken } = require("../services/auth-service");

async function authenticateToken(req, res, next) {
  /*Authenticate accessToken:
  1. token extracted from "bearer token" in req.headers.authorization.
  2. store user data extracted from payload in "req.user = { name, role };" , for use in next().
  */
  try {
    // extract token
    const bearer_Token = req.headers.authorization;
    const token = bearer_Token.split(" ")[1];
    const { name, role } = await verifyJWTAccessToken(token);

    // store user data extracted from payload in "req.user = { name, role };", for use in next().
    req.user = { name, role };
    next();
  } catch (err) {
    res.sendStatus(httpStatus.UNAUTHORIZED); //401
  }
}

module.exports = { authenticateToken };
