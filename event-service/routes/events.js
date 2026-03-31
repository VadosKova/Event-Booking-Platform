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

module.exports = router;