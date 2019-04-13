const authHelper = require("../../config/authHelper");
const { mailVerifiedEmail } = require("../../config/email");
const emailService = require("../../services/email.service");
const User = require("../../models").user;
const Company = require("../../models").company;
const Role = require("../../enums/roles.enum");
const StatusUser = require("../../enums/status.user.enum");
const { middlePriceForCompany } = require("../../config/pricingFunction");

function updateToken(user) {
  const accessToken = authHelper.generateAccessToken(user);
  const refreshToken = authHelper.generateRefreshToken(user);
  return {
    accessToken,
    refreshToken
  };
}

async function activation(_id, role, email) {
  let user;

  if (role === Role.Customer || role === Role.Admin) {
    user = await User.findByIdAndUpdate(
      { _id },
      { $set: { status: StatusUser.verified, email } }
    );
  } else if (role === Role.Executor) {
    user = await Company.findByIdAndUpdate(
      { _id },
      { $set: { status: StatusUser.verified, email } }
    );
  } else {
    throw "Not fount role";
  }
  if (user) {
    const { accessToken, refreshToken } = updateToken(user);

    const data = user.toObject();
    return {
      user: data,
      tokens: {
        accessToken,
        refreshToken
      }
    };
  } else return null;
}

async function authenticate({ identifier, password }) {
  let data;
  data = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }]
  })
    .select("+password")
    .exec();
  if (data === null) {
    data = await Company.findOne({ email: identifier })
      .select("+password")
      .exec();
  }

  if (data === null) return false;

  let success = await data.comparePassword(password);
  if (success === false) return false;

  const user = data.toObject();
  try {
    return {
      user,
      tokens: authSocialNetwork(data)
    };
  } catch (err) {
    throw err;
  }
}

async function logout() {
  console.log("logout: service ");

  return true;
}

async function register(
  { name, surname, password, email, phone, address, isNotify },
  role
) {
  try {
    if (!phone && !email) throw "Enter email or phone";
    const newUser = {
      name,
      surname,
      password,
      role,
      isNotify
    };
    if (phone) newUser.phone = phone;
    if (email) newUser.email = email;
    newUser.addresses = [address];
    const user = new User({ ...newUser });
    await user.save();
    const token = authHelper.verifiedToken(user);
    if (email) {
      emailService.sendGMail(user.email, mailVerifiedEmail(user, token));
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function registerCompany({
  name,
  description,
  address,
  email,
  password,
  services,
  rooms
}) {
  try {
    const price = middlePriceForCompany(rooms, services);
    const company = new Company({
      name,
      description,
      address,
      email,
      password,
      role: Role.Executor,
      services,
      price,
      rooms
    });
    await company.save();
    const token = authHelper.verifiedToken(company);
    if (email) {
      emailService.sendGMail(company.email, mailVerifiedEmail(company, token));
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function refreshToken(user) {
  console.log("service refresh token user id: " + user._id);
  const { accessToken, refreshToken } = updateToken(user);

  return {
    accessToken,
    refreshToken
  };
}

function authSocialNetwork(data) {
  console.log(data);
  if (
    data.status !== StatusUser.locked &&
    data.status !== StatusUser.notVerified
  ) {
    const { accessToken, refreshToken } = updateToken(data);

    return {
      accessToken,
      refreshToken
    };
  } else {
    const token = authHelper.verifiedToken(data);
    console.log(token);
    emailService.sendGMail(data.email, mailVerifiedEmail(data, token));
    throw new Error("Invalid activation");
  }
}

module.exports = {
  authenticate,
  logout,
  register,
  refreshToken,
  activation,
  registerCompany,
  authSocialNetwork
};
