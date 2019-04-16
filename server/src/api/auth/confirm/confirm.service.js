const authHelper = require("../../../config/authHelper");
const { mailSendVerifyCode } = require("../../../config/email");
const emailService = require("../../../services/email.service");
const User = require("../../../models").user;
const Company = require("../../../models").company;
const Role = require("../../../enums/roles.enum");
const StatusUser = require("../../../enums/status.user.enum");
const randToken = require("rand-token").generator({
  chars: "0-9"
});

async function activationCode({ verificationCode, email }) {
  let user = await User.findOne({ email });
  if (!user) throw new Error("Not found");

  if (user.verificationCode === verificationCode) {
    const attempts = user.attempts;
    user = await User.findOneAndUpdate(
      { email },
      {
        $set: { status: StatusUser.verified },
        $unset: { verificationCode, attempts }
      },
      { new: true }
    );
  } else {
    throw new Error("Verification code is incorrect");
  }
  const { accessToken, refreshToken } = authHelper.updateToken(user);
  const data = user.toObject();
  return {
    user: data,
    tokens: {
      accessToken,
      refreshToken
    }
  };
}

async function activationEmail({ _id }) {
  const executor = await Company.findByIdAndUpdate(
    { _id },
    { $set: { status: StatusUser.verified } }
  );

  if (executor) {
    const { accessToken, refreshToken } = authHelper.updateToken(user);

    const data = executor.toObject();
    return {
      user: data,
      tokens: {
        accessToken,
        refreshToken
      }
    };
  } else return null;
}

async function verifiedEmail({ _id, role, notVerifiedEmail }) {
  let user;
  if (role === Role.Customer || role === Role.Admin) {
    user = await User.updateOne(
      { _id },
      { $set: { email: notVerifiedEmail }, $unset: { notVerifiedEmail } }
    );
    // } else if (role === Role.Executor) {
    //   user = await Company.findByIdAndUpdate(
    //     { _id },
    //     { $set: { status: StatusUser.verified } }
    //   );
  } else {
    throw "Not fount role";
  }
  if (!user) throw "Not fount user";
}

async function createNewCode({ email }) {
  try {
    var verificationCode = randToken.generate(6);
    let user = await User.findOneAndUpdate(
      { email },
      {
        $set: { verificationCode },
        $inc: { attempts: 1 }
      },
      { new: true }
    );
    if (!user) throw new Error("Not found");
    if (user.attempts > 4) {
      await User.deleteOne({ email });
      throw new Error("Too many attempts. Account deleted");
    }
    emailService.sendGMail(
      user.email,
      mailSendVerifyCode(user, verificationCode)
    );
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  verifiedEmail,
  activationEmail,
  activationCode,
  createNewCode
};
