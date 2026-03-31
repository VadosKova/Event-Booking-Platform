const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redis = require("redis");
require("dotenv").config();

const eventsRoutes = require("./routes/events");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const client = redis.createClient({ url: "redis://redis:6379" });
client.connect();

app.use((req, res, next) => {
  req.redis = client;
  next();
});

app.use("/", eventsRoutes);

app.listen(5000, () => console.log("Event service running"));