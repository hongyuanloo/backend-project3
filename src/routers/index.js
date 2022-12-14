const express = require("express");
const app = express();
const cors = require("cors");
const { authenticateToken } = require("../middlewares/auth-middleware");
const { router: authRouter } = require("./auth-router");
const { router: eventRouter } = require("./event-router");
const { router: userRouter } = require("./user-router");

//https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const corsOptions = {
  origin: "*", // for limited access, replace with specific url e.g. http://localhost:3000
};

app.use(cors(corsOptions)); // remove "corsOptions" to allow all origins
app.use(express.json()); // parse req.body with JSON payload to JS object

//TODO temporary use add public routes.
app.use("/events", eventRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

// protected routes
// middleware to authenticate accessToken
app.use(authenticateToken);

app.get("/", (req, res) => {
  console.log("route at / ,", req.user);
  res.json({ testing: 123 });
});

//"process.env.PORT" is for use in cyclic, no need to define it in .env
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to PORT: ${process.env.PORT || 4000}`);
});
