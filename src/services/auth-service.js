const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

module.exports = { hashPassword, comparePassword, verifyJWTAccessToken };
