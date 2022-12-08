const express = require("express");
const app = express();
const cors = require("cors");
const { authenticateToken } = require("../middlewares/auth-middleware");

const { router: authRouter } = require("./auth-router");

//https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const corsOptions = {
  origin: "http://localhost:3001" || "http://localhost:3000",
};

app.use(cors(corsOptions)); // remove "corsOptions" to allow all origins
app.use(express.json()); // parse req.body with JSON payload to JS object

//auth routes; public
app.use("/auth", authRouter);

//middleware to authenticate accessToken
app.use(authenticateToken);

app.get("/", (req, res) => {
  console.log("req.user", req.user);
  res.json({ name: "testing" });
});

//"process.env.PORT" is for use in cyclic, no need to define it in .env
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to PORT: ${process.env.PORT || 4000}`);
});
