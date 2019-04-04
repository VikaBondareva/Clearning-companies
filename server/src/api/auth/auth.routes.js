const router = require("express").Router();
const controller = require(`./auth.controller`);
const permit = require("../../middleware/permission");
const jwt = require("../../middleware/activation");
const {
  authenticateGithub,
  authenticateGoogle,
  authenticateVkontakte
} = require("../../config/passport");

const validation = require("../../middleware/validation");
const schemasCompany = require("../../validation").company;
const schemaUser = require("../../validation").user;
const schemaLogin = require("../../validation").login;

router.post("/login", validation(schemaLogin, "body"), controller.login);
router.post("/logout", permit(), controller.logout);
router.post(
  "/register",
  validation(schemaUser.userPOST, "body"),
  controller.registerUser
);
router.post(
  "/register/company",
  validation(schemasCompany.companyPOST, "body"),
  controller.registerCompany
);
router.get("/current", permit(), controller.getCurrent);
router.post("/refresh-token", permit(), controller.refreshToken);
router.post("/activation/:token", jwt.checkToken, controller.activation);

router.get("/github", authenticateGithub());
router.get(
  "/github/redirect",
  authenticateGithub(),
  controller.authSocialNetwork
);

router.get("/google", authenticateGoogle());
router.get(
  "/google/redirect",
  authenticateGoogle(),
  controller.authSocialNetwork
);

router.get("/vk", authenticateVkontakte());
router.get(
  "/vk/redirect",
  authenticateVkontakte(),
  controller.authSocialNetwork
);

module.exports = router;
