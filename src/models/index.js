const mongoose = require("mongoose");
const eventModel = require("./event");
const userModel = require("./user");

//Config
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/project3Database";
const db = mongoose.connection;

//Connect
mongoose.connect(mongoURI, () => {
  console.log("Connection to Mongo DB has established.");
});

// Listener for db connection events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () =>
  console.log(
    "mongo connected: ",
    process.env.MONGO_URI ? "Mongo Atlas cloud database." : mongoURI
  )
);
db.on("disconnected", () => console.log("mongo disconnected"));

module.exports = { eventModel, userModel };
