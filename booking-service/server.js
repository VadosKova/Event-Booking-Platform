const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookingsRoutes = require("./routes/bookings");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use("/", bookingsRoutes);

app.listen(6000, () => console.log("Booking service running"));