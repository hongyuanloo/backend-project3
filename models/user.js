const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ROLES } = require("../constants");

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    role: { type: String, default: ROLES.USER }, //admin or user
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = Show;
