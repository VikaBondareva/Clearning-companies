const User = require("../../models").user;
const Role = require("../../enums/roles.enum");
const {
  mailForBlocked,
  mailForUnblocked,
  mailVerifiedNewEmail
} = require("../../config/email");
const emailService = require("../../services/email.service");
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
            phone,
            notVerifiedEmail: email
          }
        },
        { new: true }
      );
    } else {
      user = await User.findById(_id)
        .select("password email name")
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

    if (user.notVerifiedEmail) {
      const token = authHelper.verifiedToken(user);
      await emailService.sendGMail(
        email,
        mailVerifiedNewEmail(user.name, token)
      );
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
    if (user.isNotify)
      emailService.sendGMail(user.email, mailForBlocked(user.name, message));
  } else {
    const user = await User.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.verified }
    });
    if (user.isNotify)
      emailService.sendGMail(user.email, mailForUnblocked(user.name));
  }
  return true;
}

async function deleteUser(_id) {
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
