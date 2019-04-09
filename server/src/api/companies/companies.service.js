const Company = require("../../models").company;
const {
  mailForBlocked,
  mailForUnblocked,
  mailVerifiedEmail
} = require("../../config/email");
const emailService = require("../../services/email.service");
const authHelper = require("../../config/authHelper");
const StatusUser = require("../../enums/status.user.enum");

async function getCompanies({
  page,
  perPage,
  city,
  maxPrice,
  minPrice,
  sort,
  name,
  services
}) {
  console.log(city);
  sort = sort
    ? sort === "asc"
      ? "price"
      : "-price"
    : sort === "ratting"
    ? "ratting"
    : "";
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "name address ratting services workPlan rooms price",
    sort: `${sort}`
  };
  const query = {};
  query.status = { $gte: 1 };
  (query["address.city"] = city || { $regex: "" }),
    (query.name = { $regex: name || "" }),
    (query["services.name"] = services || { $regex: "" }),
    (query.price = { $gte: minPrice || 0, $lte: maxPrice || 10000 });

  const companies = await Company.paginate(query, options);

  return companies;
}

async function getByIdCompany(id) {
  const company = await Company.findById(id);
  if (!company) throw new Error("Not found");
  const data = company.toObject();
  return data;
}

async function updateCompany(
  {
    name,
    description,
    address,
    services,
    email,
    workPlan,
    rooms,
    oldPassword,
    newPassword
  },
  { _id }
) {
  try {
    let company;
    if (!oldPassword) {
      company = await User.findByIdAndUpdate(
        _id,
        { $set: { name, description, address, services, workPlan, rooms } },
        { new: true }
      );
    } else {
      company = await User.findById(_id)
        .select("+password")
        .exec();

      const success = await company.comparePassword(oldPassword);
      if (success === false) throw "Not wrong old password";

      company.name = name;
      company.description = description;
      company.address = address;
      company.services = services;
      company.workPlan = workPlan;
      company.rooms = rooms;
      company.password = newPassword;
      await company.save();
    }

    if (company.email !== email) {
      const token = authHelper.verifiedToken(company);
      await emailService.sendGMail(
        email,
        mailVerifiedEmail(company.name, email, token)
      );
    }

    return true;
  } catch {
    return false;
  }
}

async function deleteCompany(_id) {
  try {
    Company.findByIdAndUpdate(_id, { $set: { status: StatusUser.deleted } });
    return true;
  } catch {
    return false;
  }
}

async function blockCompany({ message, block }, _id) {
  if (block) {
    const company = await Company.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.locked, lockMessage: `${message}` }
    });
    emailService.sendGMail(
      company.email,
      mailForBlocked(company.name, message)
    );
  } else {
    const company = await Company.findByIdAndUpdate(_id, {
      $set: { status: StatusUser.verified }
    });
    emailService.sendGMail(company.email, mailForUnblocked(company.name));
  }
  return true;
}

module.exports = {
  getCompanies,
  getByIdCompany,
  updateCompany,
  deleteCompany,
  blockCompany
};
