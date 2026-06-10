// redis.js

const { createClient } = require("redis");
console.log("REDIS_URL =", process.env.REDIS_URL);
const redis = createClient({
  url: process.env.REDIS_URL,
});


redis.on("error", function (err) {
  console.log("Redis Error:", err);
});

module.exports = redis;
