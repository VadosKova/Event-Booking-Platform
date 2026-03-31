const router = require("express").Router();
const Event = require("../models/Event");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const redis = require("redis");
const client = redis.createClient({ url: "redis://redis:6379" });

client.connect();

router.get("/", async (req, res) => {
  try {
    const cached = await client.get("events");

    if (cached) {
      console.log("Events from cache");
      return res.json(JSON.parse(cached));
    }

    const events = await Event.find();

    await client.set("events", JSON.stringify(events), { EX: 60 });

    console.log("Events from DB");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
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