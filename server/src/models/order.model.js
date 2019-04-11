const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
var mongoosePaginate = require("mongoose-paginate");
const Reccurent = require("../enums/reccurent.enum");

const schema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    address: { type: String, required: true },
    regularity: {
      type: Number,
      required: true,
      default: Reccurent.onlyOne,
      max: 4,
      min: 1
    },
    duration: { type: Number, min: 1, max: 6 },
    days: [{ type: String, required: true }],
    date: [{ type: String, required: true }],
    startTime: { type: String, required: true },
    services: [{ type: String, required: true }],
    countRooms: {
      toilet: { type: Number, required: true, default: 0 },
      standart: { type: Number, required: true, default: 0 },
      big: { type: Number, required: true, default: 0 }
    },
    status: { type: String, required: true, lowercase: true },
    price: { type: SchemaTypes.Double, required: true },
    cleanTime: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    lockMessage: { type: String }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.index({
  status: "text"
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", schema);
