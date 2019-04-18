const mongoose = require("mongoose");
const { getStringTime, replaceTime } = require("../config/pricingFunction");

const schema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  day: { type: Number, required: true },
  start: { type: String, required: true, set: replaceTime, get: getStringTime },
  end: { type: String, required: true, set: replaceTime, get: getStringTime }
});

schema.set("toObject", {
  getters: true,
  setters: true,
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("WorkPlan", schema);
