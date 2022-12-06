const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    timing: [
      {
        datetime_start: { type: Date, required: true },
        datetime_end: { type: Date },
      },
    ],
    timezone: { type: String, default: "Asia/Singapore" },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image_urls: { type: String },
    arts_groups: { type: String },
    price: { type: Number, required: true, min: 0 },
    is_featured: { type: Boolean },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
