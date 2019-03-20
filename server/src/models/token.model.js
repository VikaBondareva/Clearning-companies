const mongoose = require("mongoose");
const config = require("../config/environment");

var schema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: config.jwt.refresh.expiration
  }
});

module.exports = mongoose.model("Token", schema);
