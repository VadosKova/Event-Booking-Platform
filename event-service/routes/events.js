const router = require("express").Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

router.post("/:id/reserve", async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).send("Event not found");

  if (event.availableSeats <= 0) {
    return res.status(400).send("No seats available");
  }

  event.availableSeats -= 1;
  await event.save();

  res.json(event);
});

module.exports = router;