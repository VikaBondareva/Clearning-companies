const authHelper = require("../../config/authHelper");
const { mailForVerified } = require("../../config/email");
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

    return {
      accessToken,
      refreshToken
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

  try {
    return {
      user: data,
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
    const addresses = [address];
    const user = new User({
      name,
      surname,
      password,
      email,
      phone,
      role,
      addresses,
      isNotify
    });
    await user.save();
    const token = authHelper.verifiedToken(role, user._id);
    if (email) {
      emailService.sendGMail(user.email, mailForVerified(user, token));
    }
    // else if (phone) {
    //   user.sendSMS("Ваш код подтверждения: 25864");
    // }
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
  workPlan,
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
      workPlan,
      price,
      rooms
    });
    await company.save();
    const token = authHelper.verifiedToken(company);
    if (email) {
      emailService.sendGMail(company.email, mailForVerified(company, token));
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
    emailService.sendGMail(data.email, mailForVerified(data, token));
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
