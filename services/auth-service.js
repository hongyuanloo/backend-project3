const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function hashPassword(password) {
  //return hashed password
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    if (err) return err;
  }
}

async function comparePassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash); // return Boolean
  } catch (err) {
    if (err) return err;
  }
}

function generateRandomBytes() {
  /* generate 64 random bytes and convert to hex format.
  -Use this to generate "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" */
  const buffer = crypto.randomBytes(64).toString("hex");
  console.log("buffer: ", buffer);
  return buffer;
}

module.exports = { hashPassword, comparePassword };
