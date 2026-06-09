// redis.js

const { createClient } = require("redis");

const redis = createClient();

redis.on("error", function (err) {
  console.log("Redis Error:", err);
});

module.exports = redis;
