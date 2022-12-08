const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  REFRESH_TOKEN_LIFESPAN,
  ACCESS_TOKEN_LIFESPAN,
} = require("../constants");

async function hashPassword(password) {
  //return hashed password
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw err;
  }
}

async function comparePassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash); // return Boolean
  } catch (err) {
    throw err;
  }
}

function generateRandomBytes() {
  /* generate 64 random bytes and convert to hex format.
  -Use this to generate "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" */
  const buffer = crypto.randomBytes(64).toString("hex");
  console.log("buffer: ", buffer);
  return buffer;
}

async function verifyJWTAccessToken(token) {
  try {
    //return decoded payload object
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw err;
  }
}

async function verifyJWTRefreshToken(token) {
  try {
    //return decoded payload object
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw err;
  }
}

function generateTokenPayload(userObj) {
  // return standard token payload object
  const { name, role } = userObj;
  return { name, role };
}

function generateAccessToken(tokenPayload) {
  // generate token based on result of "generateTokenPayload(userObj)"
  return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFESPAN,
  });
}

function generateRefreshToken(tokenPayload) {
  // generate token based on result of "generateTokenPayload(userObj)"
  return jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFESPAN,
  });
}

function isTokenExpired(tokenExpiredAt_seconds) {
  const currTime = Math.floor(Date.now() / 1000); // in seconds
  return currTime - tokenExpiredAt_seconds > 0 ? true : false;
}

module.exports = {
  hashPassword,
  comparePassword,
  verifyJWTAccessToken,
  verifyJWTRefreshToken,
  generateTokenPayload,
  generateAccessToken,
  generateRefreshToken,
  isTokenExpired,
};
