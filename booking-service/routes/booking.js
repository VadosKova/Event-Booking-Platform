const router = require("express").Router();
const axios = require("axios");
const Booking = require("../models/Booking");

const amqp = require("amqplib");

async function sendToQueue(data) {
  const conn = await amqp.connect("amqp://rabbitmq");
  const channel = await conn.createChannel();

  await channel.assertQueue("booking");

  channel.sendToQueue("booking", Buffer.from(JSON.stringify(data)));
}

router.post("/", async (req, res) => {
  const { userId, eventId } = req.body;

  const event = await axios.get(
    `http://event-service:5000/${eventId}`
  );

  if (!event.data) {
    return res.status(404).send("Event not found");
  }

  const booking = await Booking.create({ userId, eventId });

  await sendToQueue({
    type: "BOOKING_CREATED",
    userId,
    eventId
  });

  res.json(booking);
});

module.exports = router;