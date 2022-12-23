const express = require("express");
const app = express();
const cors = require("cors");
const { authenticateToken } = require("../middlewares/auth-middleware");
const { router: authRouter } = require("./auth-router");
const { router: eventRouter } = require("./event-router");
const { router: userRouter } = require("./user-router");
const httpStatus = require("http-status");

// Handle cors
//https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const corsOptions = {
  origin: "*", // for limited access, replace with specific url e.g. http://localhost:3000
};

app.use(cors(corsOptions)); // remove "corsOptions" to allow all origins
app.use(express.json()); // parse req.body with JSON payload to JS object

// APIs
app.use("/events", eventRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

// any other undefined routes
app.get("/*", (req, res) => {
  res.sendStatus(httpStatus.NO_CONTENT);
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to PORT: ${process.env.PORT || 4000}`);
});
