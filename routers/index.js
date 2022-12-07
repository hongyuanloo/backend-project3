const express = require("express");
const app = express();
const cors = require("cors");

const { router: authRouter } = require("./auth-router");

//https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const corsOptions = {
  origin: "http://localhost:3001" || "http://localhost:3000",
};

app.use(cors(corsOptions)); // remove "corsOptions" to allow all origins
app.use(express.json()); // parse req.body with JSON payload to JS object

app.get("/", (req, res) => {
  res.json({ name: "testing" });
});

/*{
    "name": "Loo",
    "email": "loo@hotmail.com",
    "password": "123"
} */

app.use("/auth", authRouter);
// app.post("/signup", (req, res) => {
//   //get data from req.body
//   //create new User.
//   const userInfor = req.body;
//   const newUser = new userModel(userInfor);
//   newUser.save((err) => {
//     if (err) {
//       const errorObj = { errCode: err.code, errMessage: "" };
//       switch (err.code) {
//         case 11000: //"name" or "email" already exist.
//           const key = Object.keys(err.keyValue)[0];
//           errorObj.errMessage = `'${err.keyValue[key]}' already exist. Select another ${key}.`;
//           // console.log(errorObj, err);
//           res.status(httpStatus.CONFLICT).json(errorObj); //409 - CONFLICT
//           return;

//         default:
//           res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
//       }
//     }
//     res.sendStatus(httpStatus.CREATED); // 201 - CREATED
//   });
// });

//"process.env.PORT" is for use in cyclic, no need to define it in .env
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to PORT: ${process.env.PORT || 4000}`);
});
