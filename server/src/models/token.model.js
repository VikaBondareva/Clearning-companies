const mongoose = require("mongoose");
const config = require("../config/environment");

var schema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  userId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Token", schema);
