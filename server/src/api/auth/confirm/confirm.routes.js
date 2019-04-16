const router = require("express").Router();
const controller = require(`./confirm.controller`);
const permit = require("../../../middleware/permission");
const Roles = require("../../../enums/roles.enum");

router.put("/email", permit([Roles.Executor]), controller.activationEmail);
router.put("/code", controller.activationCode);
router.put("/", permit(), controller.verifiedEmail);
router.post("/", controller.newCode);

module.exports = router;
