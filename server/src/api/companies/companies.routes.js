const router = require("express").Router();
const controller = require(`./companies.controller`);
const permit = require("../../middleware/permission");
const Role = require("../../enums/roles.enum");
const validation = require("../../middleware/validation");
const schemas = require("../../validation").company;

router.get("/", validation(schemas.companyQUERY, "query"), controller.get);
router.get("/admin", controller.getForAdmin);
router.get("/:id", controller.getById);
router.put("/:id/block", permit(Role.Admin), controller.blockById);
router.put(
  "/",
  permit(Role.Executor),
  // validation(schemas.companyPUT, "body"),
  controller.put
);
module.exports = router;
