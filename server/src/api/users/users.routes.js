const router = require("express").Router();
const Role = require("../../enums/roles.enum");
const controller = require(`./users.controller`);
const permit = require("../../middleware/permission");

router.get("/", permit(Role.Admin), controller.get);
router.get("/:id", controller.getById);
router.delete("/:id", permit(Role.Customer), controller._delete);

router.put("/:id/block", permit(Role.Admin), controller.blockById);

router.put("/", permit([Role.Customer, Role.Admin]), controller.put);
// router.put("/newVerificationCode",permit([Role.Customer, Role.Admin]), controller.newVerificationCode);

module.exports = router;
