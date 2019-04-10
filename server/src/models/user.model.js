var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  emailValidator,
  passwordValidator,
  pnumberValidator,
  nameValidator
} = require("../validation/model.validation");
const { sendMessage } = require("../services/phone.service");
const StatusUser = require("../enums/status.user.enum");
var mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, validate: nameValidator },
    surname: { type: String, required: true, validate: nameValidator },
    email: { type: String, validate: emailValidator },
    phone: { type: String, validate: pnumberValidator },
    password: { type: String, select: false, validate: passwordValidator },
    addresses: [{ type: String, required: true }],
    // addresses: [
    //   {
    //     country: { type: String, require: true },
    //     city: { type: String, require: true },
    //     district: { type: String },
    //     street: { type: String, require: true },
    //     house: { type: Number, require: true },
    //     apartment: { type: Number }
    //   }
    // ],
    status: { type: Number, required: true, default: StatusUser.notVerified },
    githubId: { type: String, unique: true },
    googleId: { type: String, unique: true },
    vkontakteId: { type: String, unique: true },
    role: { type: String, required: true, lowercase: true },
    isNotify: { type: Boolean, required: true, default: false },
    lockMessage: { type: String }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

////hashing a password before saving it to the database
schema.pre("save", function(next) {
  if (!this.githubId && !this.googleId && !this.vkontakteId && !this.password) {
    next(new Error("Need password"));
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function(next) {
  if (!this.githubId && !this.googleId && !this.vkontakteId && !this.password) {
    next(new Error("Need password"));
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else if (
    !doc.githubId &&
    !doc.googleId &&
    !doc.vkontakteId &&
    !doc.password
  ) {
    next(new Error("Need password"));
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

schema.methods.sendSMS = function(message) {
  let self = this;
  if (self.phone) {
    return new Promise((resolve, reject) => {
      sendMessage(message, self.phone, (err, success) => {
        if (err) return reject(err);
        return resolve(success);
      });
    });
  }
};

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", schema);
