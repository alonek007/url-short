const express = require("express");
const dotenv = require("dotenv");

const ratelimit = require("express-rate-limit");
const path = require("path")




const limiter = ratelimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

const redis = require("./redis");

async function start() {
  await redis.connect();

  app.listen(3000, () => {
    console.log("Server running");
  });
}

start();

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
// const ok = path.join(__dirname, "../public");
// console.log(__dirname)
// console.log(ok)  debugging stuff

app.use(limiter);

const urlRoutes = require("./routes/url");
app.use("/", urlRoutes);

app.listen(process.env.PORT, function () {
  console.log("working");
});
