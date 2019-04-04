const router = require("express").Router();
const controller = require(`./companies.controller`);
const permit = require("../../middleware/permission");
const Role = require("../../enums/roles.enum");
const validation = require("../../middleware/validation");
const schemas = require("../../validation").company;

router.get("/", validation(schemas.companyQUERY, "query"), controller.get);
router.get("/:id", controller.getById);
router.delete("/", permit(Role.Executor), controller._delete);
router.put("/:id/block", permit(Role.Admin), controller.blockById);

router.put(
  "/:id",
  permit(Role.Executor),
  validation(schemas.companyPUT, "body"),
  controller.put
);
module.exports = router;
