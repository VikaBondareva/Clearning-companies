const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const bcrypt = require("bcrypt");
const {
  nameValidator,
  emailValidator,
  passwordValidator
} = require("../validation/model.validation");
const StatusUser = require("../enums/status.user.enum");
var mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    // logoUrl: {type: String, required: true, get: v => `${root}${v}`},
    name: {
      type: String,
      required: true,
      unique: true,
      validate: nameValidator
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 1000
    },
    address: {
      country: { type: String, require: true },
      city: { type: String, require: true },
      district: { type: String },
      street: { type: String, require: true },
      house: { type: String, require: true },
      apartment: { type: String }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidator
    },
    rooms: {
      toilet: {
        price: { type: SchemaTypes.Double, required: true, default: 0 },
        time: { type: Number, required: true, default: 0 }
      },
      standart: {
        price: { type: SchemaTypes.Double, required: true, default: 0 },
        time: { type: Number, required: true, default: 0 }
      },
      big: {
        price: { type: SchemaTypes.Double, required: true, default: 0 },
        time: { type: Number, required: true, default: 0 }
      }
    },
    services: [
      {
        name: { type: String, required: true },
        coefficient: { type: SchemaTypes.Double, required: true }
      }
    ],
    workPlan: [
      {
        day: { type: String, require: true },
        workHours: {
          start: { type: String, require: true },
          end: { type: String, require: true }
        },
        lunchHours: {
          start: { type: String, require: true },
          end: { type: String, require: true }
        }
      }
    ],
    price: { type: SchemaTypes.Double, required: true },
    role: { type: String, required: true, lowercase: true },
    status: { type: Number, required: true, default: StatusUser.notVerified },
    ratting: { type: SchemaTypes.Double, default: 0 },
    password: {
      type: String,
      required: true,
      select: false,
      validate: passwordValidator
    },
    lockMessage: { type: String }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.index({
  name: "text",
  "address.country": "text",
  "services.name": "text"
});
////hashing a password before saving it to the database
schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Company already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Company", schema);
