const User = require("../../models").user;
const Role = require("../../enums/roles.enum");
const {
  mailForBlocked,
  mailForUnblocked,
  mailVerifiedEmail
} = require("../../config/email");
const emailService = require("../../services/email.service");
const authHelper = require("../../config/authHelper");
const StatusUser = require("../../enums/status.user.enum");

async function getAllUsers({ page, perPage }) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "name surname address email"
  };
  const query = {
    role: Role.Customer
  };
  const users = User.paginate(query, options);
  return users;
}

async function update(
  { _id },
  { name, surname, email, addresses, oldPassword, newPassword }
) {
  try {
    let user;
    if (!oldPassword) {
      await User.findByIdAndUpdate(
        _id,
        { $set: { name, surname, addresses } },
        { new: true }
      );
    } else {
      user = await User.findById(_id)
        .select("+password")
        .exec();

      const success = await user.comparePassword(oldPassword);
      if (success === false) throw "Not wrong old password";

      user.name = name;
      user.surname = surname;
      user.addresses = addresses;
      user.password = newPassword;
      await user.save(err => {
        if (err) throw err;
      });
    }

    if (user.email !== email) {
      const token = authHelper.verifiedToken(user);
      await emailService.sendGMail(
        email,
        mailVerifiedEmail(user.name, email, token)
      );
    }
    return true;
  } catch {
    return false;
  }
}

async function blockUser({ message, block }, _id) {
  if (block) {
    const user = await User.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.locked, lockMessage: `${message}` }
    });
    emailService.sendGMail(user.email, mailForBlocked(user.name, message));
  } else {
    const user = await User.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.verified }
    });
    emailService.sendGMail(user.email, mailForUnblocked(user.name));
  }
  return true;
}

async function deleteUser(_id, { isDeleted }) {
  const user = User.findByIdAndUpdate(_id, {
    $set: { status: StatusUser.deleted }
  });
  return user;
}

module.exports = {
  update,
  blockUser,
  getAllUsers,
  deleteUser
};
