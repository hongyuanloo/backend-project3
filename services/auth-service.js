const bcrypt = require("bcrypt");

const hashPassword = async function (password) {
  //return hashed password
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    if (err) {
      return err;
    }
  }
};

module.exports = { hashPassword };
