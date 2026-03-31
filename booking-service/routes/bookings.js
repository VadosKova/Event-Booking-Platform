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
  try {
    const { userId, eventId } = req.body;

    await axios.post(`http://event-service:5000/${eventId}/reserve`);

    const booking = await Booking.create({ userId, eventId });

    console.log("Booking created:", booking);

    await sendToQueue({ userId, eventId });

    res.json(booking);

  } catch (err) {
    console.error("Booking error:", err.response?.data || err.message);
    res.status(400).send("Booking failed");
  }
});

module.exports = router;