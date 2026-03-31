const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

app.use("/auth", createProxyMiddleware({
  target: "http://user-service:4000",
  changeOrigin: true,
  pathRewrite: {
    "^/auth": "",
  },
}));

app.use("/events", createProxyMiddleware({
  target: "http://event-service:5000",
  changeOrigin: true,
  pathRewrite: {
    "^/events": "",
  },
}));

app.use("/bookings", createProxyMiddleware({
  target: "http://booking-service:6000",
  changeOrigin: true,
  pathRewrite: {
    "^/bookings": "",
  },
}));

app.listen(3001, () => console.log("API Gateway running"));