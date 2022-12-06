const express = require("express");
const app = express();
const cors = require("cors");

//https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
const corsOptions = {
  origin: "http://localhost:3001" || "http://localhost:3000",
};

app.use(cors(corsOptions)); // remove "corsOptions" to allow all origins
app.use(express.json()); // parse req.body with JSON payload to JS object

app.get("/", (req, res) => {
  res.json({ name: "testing" });
});

//"process.env.PORT" is for use in cyclic, no need to define it in .env
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to PORT: ${process.env.PORT || 4000}`);
});
