const User = require("../../models").user;
const Role = require("../../enums/roles.enum");
const {
  mailForBlocked,
  mailForUnblocked,
  mailVerifiedNewEmail
} = require("../../config/email");
const authHelper = require("../../config/authHelper");
const StatusUser = require("../../enums/status.user.enum");

async function getAllUsers({ page, perPage, status }) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "name surname email status phone created_at lockMessage"
  };
  const query = {
    role: Role.Customer,
    status: status || [
      StatusUser.notVerified,
      StatusUser.verified,
      StatusUser.locked
    ]
  };
  const users = User.paginate(query, options);
  return users;
}

async function update(
  { _id },
  { name, surname, email, addresses, phone, oldPassword, newPassword, isNotify }
) {
  try {
    let user;
    if (!oldPassword) {
      user = await User.findByIdAndUpdate(
        _id,
        {
          $set: {
            name,
            surname,
            addresses,
            isNotify,
            phone
          }
        },
        { new: true }
      );
      if (user.email !== email) {
        console.log(user.email !== email);
        await User.updateOne({ _id }, { $set: { notVerifiedEmail: email } });
        const token = authHelper.verifiedToken(user);
        await user.sendMailMessage(mailVerifiedNewEmail(user.name, token));
      }
    } else {
      user = await User.findById(_id)
        .select("password")
        .exec();

      const success = await user.comparePassword(oldPassword);
      if (success === false) return "Wrong old password";

      if (newPassword === oldPassword)
        return "Old password and new password id equal";
      user.password = newPassword;
      await user.save(err => {
        if (err) throw err;
      });
    }
  } catch (error) {
    throw error;
  }
}

async function blockUser({ message, block }, _id) {
  if (block) {
    const user = await User.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.locked, lockMessage: `${message}` }
    });
    await user.sendMailMessage(mailForBlocked(user.name, message));
  } else {
    const user = await User.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.verified }
    });
    await user.sendMailMessage(mailForUnblocked(user.name));
  }
  return true;
}

module.exports = {
  update,
  blockUser,
  getAllUsers
};
