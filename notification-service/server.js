const amqp = require("amqplib");

async function start() {
  const conn = await amqp.connect("amqp://rabbitmq");
  const ch = await conn.createChannel();

  await ch.assertQueue("booking");

  console.log("Notification service started");

  ch.consume("booking", (msg) => {
    const data = JSON.parse(msg.content.toString());

    console.log("Booking received:", data);

    ch.ack(msg);
  });
}

start();