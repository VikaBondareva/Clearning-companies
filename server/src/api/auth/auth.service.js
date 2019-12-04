const authHelper = require("../../config/authHelper");
const { mailVerifiedEmail, mailSendVerifyCode } = require("../../config/email");
const User = require("../../models").user;
const Token = require("../../models").token;
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
  if (data.status === StatusUser.locked) throw "Your account is blocking";
  if (data.status === StatusUser.notVerified)
    throw "Your account is not verified";
  let success = await data.comparePassword(password);
  if (success === false) return false;

  const user = data.toObject();
  try {
    return authSocialNetwork(user);
  } catch (err) {
    throw err;
  }
}

async function logout(userId) {
  await Token.deleteOne({ userId });
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
    // newUser.addresses = [];
    const user = new User({ ...newUser });
    await user.save();
    user.sendMailMessage(mailSendVerifyCode(user, verificationCode));
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
    company.sendMailMessage(mailVerifiedEmail(company, token));
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
    data.sendMailMessage(mailVerifiedEmail(data, token));
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
