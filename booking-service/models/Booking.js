const mongoose = require("mongoose");

module.exports = mongoose.model("Booking", {
  userId: String,
  eventId: String,
  createdAt: { type: Date, default: Date.now }
});