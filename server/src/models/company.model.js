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

const getStringTime = timeNumber => {
  let str = timeNumber.toString();
  const length = str.length;
  let hours = "";

  if (length === 3) {
    hours = "0" + str.substring(0, 1);
  } else {
    hours = str.substring(0, 2);
  }
  let minutes = str.slice(-2);
  let timeString = `${hours}:${minutes}`;
  return timeString;
};

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
      maxlength: 9999
    },
    address: {
      country: { type: String, require: true },
      city: { type: String, require: true },
      other: { type: String, require: true }
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
    workPlan: {
      type: [
        {
          day: { type: Number, required: true },
          start: { type: Number, required: true, get: getStringTime },
          end: { type: Number, required: true, get: getStringTime }
          // day: { type: String, require: true },
          // workHours: {
          //   start: { type: String, require: true },
          //   end: { type: String, require: true }
          // },
          // lunchHours: {
          //   start: { type: String, require: true },
          //   end: { type: String, require: true }
          // }
        }
      ],
      maxlength: 7
    },
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

// schema.index({
//   name: "text",
//   "address.country": "text",
//   "services.name": "text"
// });
// ////hashing a password before saving it to the database
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
  getters: true,
  setters: true,
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Company", schema);
