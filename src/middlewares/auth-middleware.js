// const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const {
  verifyJWTAccessToken,
  generateTokenPayload,
  isTokenExpired,
} = require("../services/auth-service");

async function authenticateToken(req, res, next) {
  /*Authenticate accessToken:
  1. token extracted from "bearer token" in req.headers.authorization.
  2. store user data extracted from payload in "req.user = { name, role };" , for use in next().
  3. token only useable within its life span.
  */
  try {
    // extract token
    const bearer_Token = req.headers.authorization;
    const token = bearer_Token.split(" ")[1];

    // decoded decoded payload object
    const userObj = await verifyJWTAccessToken(token);
    // check if refreshToken has expired.
    if (isTokenExpired(userObj.exp)) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    // get new tokenPayload
    const tokenPayload = generateTokenPayload(userObj);

    // store user data extracted from payload in "req.user = { name, role };", for use in next().
    req.user = tokenPayload;
    console.log("Token Authenticated!");
    next();
  } catch (err) {
    res.sendStatus(httpStatus.UNAUTHORIZED); //401
  }
}

module.exports = { authenticateToken };
