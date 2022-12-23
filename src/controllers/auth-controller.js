const { userModel } = require("../models");
const httpStatus = require("http-status");
const {
  comparePassword,
  generateTokenPayload,
  verifyJWTRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  generateBearerToken,
} = require("../services/auth-service");

/*{
    "name": "loo",
    "email": "loo@hotmail.com",
    "password": "abc"    }
  {
    "name":"John",
    "email":"hy@gmail.com",
    "password":"123"    } */

async function login(req, res) {
  const { email, password } = req.body;
  try {
    /* find user using email. 
        if found, foundUser = 
{
  _id: new ObjectId("639093631ef58da7e22374a3"),
  email: 'loo@hotmail.com',
  password: '$2b$10$N.ZUvX98A2n1F2YkJBdqL.k2keQPCD5iPWyX5zqyXxe73hzS/9QyG',
  role: 'user'
  savedEvents: [{}...]
}
       if not found, foundUser = null    */
    const foundUser = await userModel
      .findOne(
        { email: email.toLowerCase() },
        "_id name password role savedEvents"
      )
      .populate("savedEvents");

    if (!foundUser) return res.sendStatus(httpStatus.NOT_FOUND);

    const { _id, name, password: userPassword, role, savedEvents } = foundUser;

    // check password match? ; Boolen result.
    const passwordOK = await comparePassword(password, userPassword);
    if (!passwordOK) return res.sendStatus(httpStatus.FORBIDDEN);

    //generate tokenPayload
    const tokenPayload = generateTokenPayload(foundUser);

    //generate accessToken and refreshToken generateRefreshToken
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    res.status(httpStatus.OK).json({
      accessToken,
      refreshToken,
      user: { _id, name, role, savedEvents },
    });
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getNewAccessToken(req, res) {
  try {
    // extract refreshToken
    const refreshToken = generateBearerToken(req.headers.authorization);

    //decoded decoded payload object; error if token mismatch or expired.
    const userObj = await verifyJWTRefreshToken(refreshToken);

    // if token not expired, get new tokenPayload
    const tokenPayload = generateTokenPayload(userObj);

    //generate new accessToken
    const accessToken = generateAccessToken(tokenPayload);
    res.status(httpStatus.OK).json({ accessToken });
  } catch (err) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

module.exports = { login, getNewAccessToken };
