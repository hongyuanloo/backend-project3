const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    // name: { type: String, required: true },
    // datetime_start: { type: Date, required: true },
    // datetime_end: { type: Date },
    title: { type: String, required: true, unique: true },
    start: { type: Date, required: true },
    end: { type: Date },
    timezone: { type: String, default: "Asia/Singapore" },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image_urls: { type: String },
    arts_groups: { type: String },
    price: { type: Number, required: true, min: 0 },
    // is_featured: { type: Boolean },
    // createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;

const aa = {
  title: "Own Your Power to Glow",
  start: "2022-12-08T10:00:00",
  end: "2022-12-09T22:00:00",
  timezone: "Asia/Singapore",
  location: "Ion Orchard, Orchard Road, Singapore",
  description: "bla bla bla..",
  image_urls:
    "https://cdn.eventfinda.sg/uploads/events/transformed/49182-23629-34.jpg?v=2",
  arts_groups: "Ion Orchard",
  price: 0,
};
