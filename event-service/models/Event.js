const mongoose = require("mongoose");

module.exports = mongoose.model("Event", {
  title: String,
  description: String,
  date: Date,
  seats: Number,
});