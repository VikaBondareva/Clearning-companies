const authHelper = require("../../config/authHelper");
const { mailVerifiedEmail, mailSendVerifyCode } = require("../../config/email");
const emailService = require("../../services/email.service");
const User = require("../../models").user;
const Company = require("../../models").company;
const Role = require("../../enums/roles.enum");
const StatusUser = require("../../enums/status.user.enum");
const { middlePriceForCompany } = require("../../config/pricingFunction");
const randToken = require("rand-token").generator({
  chars: "0-9"
});

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
  if (data.status !== StatusUser.verified) throw "Your account is blocking";
  let success = await data.comparePassword(password);
  if (success === false) return false;

  const user = data.toObject();
  try {
    return authSocialNetwork(user);
  } catch (err) {
    throw err;
  }
}

async function logout() {
  return true;
}

async function register(
  { name, surname, password, email, phone, address },
  role
) {
  try {
    var verificationCode = randToken.generate(6);
    const newUser = {
      name,
      surname,
      verificationCode,
      password,
      role,
      email,
      phone
    };
    newUser.addresses = [address];
    const user = new User({ ...newUser });
    await user.save();
    emailService.sendGMail(
      user.email,
      mailSendVerifyCode(user, verificationCode)
    );
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
  workPlan,
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
      workPlan,
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
  const { accessToken, refreshToken } = authHelper.updateToken(user);
  return {
    accessToken,
    refreshToken
  };
}

async function authSocialNetwork(data) {
  if (
    data.status !== StatusUser.locked &&
    data.status !== StatusUser.notVerified
  ) {
    const { accessToken, refreshToken } = authHelper.updateToken(data);
    return {
      user: data,
      tokens: {
        accessToken,
        refreshToken
      }
    };
  } else {
    const token = authHelper.verifiedToken(data);
    emailService.sendGMail(data.email, mailVerifiedEmail(data, token));
    throw new Error("Invalid activation");
  }
}

module.exports = {
  authenticate,
  logout,
  register,
  refreshToken,
  registerCompany,
  authSocialNetwork
};
