const amqp = require("amqplib");

async function connectRabbit() {
  try {
    const conn = await amqp.connect("amqp://rabbitmq");
    return conn;
  } catch (err) {
    console.log("Waiting for RabbitMQ...");
    await new Promise(res => setTimeout(res, 3000));
    return connectRabbit();
  }
}

async function start() {
  const conn = await connectRabbit();
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